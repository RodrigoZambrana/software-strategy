<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'method_not_allowed']);
    exit;
}

$configPath = __DIR__ . '/contact-config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'server_not_configured']);
    exit;
}

$config = require $configPath;

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function normalize_origin(?string $value): string
{
    if (!$value) {
        return '';
    }

    $parts = parse_url($value);
    if (!is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
        return '';
    }

    $origin = strtolower($parts['scheme']) . '://' . strtolower($parts['host']);
    if (!empty($parts['port'])) {
        $origin .= ':' . (int) $parts['port'];
    }

    return $origin;
}

function valid_origin(array $config): bool
{
    $origin = normalize_origin($_SERVER['HTTP_ORIGIN'] ?? '');
    $referer = normalize_origin($_SERVER['HTTP_REFERER'] ?? '');
    $allowed = array_map('strtolower', $config['allowed_origins'] ?? []);

    if ($origin !== '' && in_array($origin, $allowed, true)) {
        return true;
    }

    if ($origin === '' && $referer !== '' && in_array($referer, $allowed, true)) {
        return true;
    }

    return false;
}

function verify_recaptcha(string $token, array $config): array
{
    $fields = http_build_query([
        'secret' => $config['recaptcha_secret'] ?? '',
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $body = false;
    $status = 0;
    $curlError = '';

    if (function_exists('curl_init')) {
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $fields,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        ]);
        $body = curl_exec($ch);
        $curlError = curl_error($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => $fields,
                'timeout' => 15,
            ],
        ]);
        $body = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
        if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $matches) === 1) {
            $status = (int) $matches[1];
        }
    }

    if ($body === false || $status < 200 || $status >= 300) {
        return ['success' => false, 'error' => $curlError ?: 'recaptcha_request_failed'];
    }

    $decoded = json_decode($body, true);
    return is_array($decoded) ? $decoded : ['success' => false, 'error' => 'recaptcha_invalid_response'];
}

function smtp_read_response($socket): array
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (preg_match('/^\d{3}\s/', $line) === 1) {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);
    return [$code, trim($response)];
}

function smtp_expect($socket, array $expectedCodes): void
{
    [$code, $response] = smtp_read_response($socket);
    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException('SMTP error: ' . $response);
    }
}

function smtp_command($socket, string $command, array $expectedCodes): void
{
    fwrite($socket, $command . "\r\n");
    smtp_expect($socket, $expectedCodes);
}

function encode_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function string_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
}

function contains_header_injection(string $value): bool
{
    return preg_match('/[\r\n]/', $value) === 1;
}

function sanitize_text(string $value): string
{
    $value = trim($value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? $value;
    $value = preg_replace('/\s+/u', ' ', $value) ?? $value;
    return trim($value);
}

function sanitize_message(string $value): string
{
    $value = trim($value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[^\P{C}\n\t]/u', '', $value) ?? $value;
    $value = preg_replace("/\n{3,}/", "\n\n", $value) ?? $value;
    return trim($value);
}

function sanitize_email_value(string $value): string
{
    $value = trim($value);
    $value = filter_var($value, FILTER_SANITIZE_EMAIL);
    return is_string($value) ? trim($value) : '';
}

function send_mail_smtp(array $config, array $data): void
{
    $remote = (!empty($config['smtp_secure']) ? 'ssl://' : '') . $config['smtp_host'];
    $socket = @fsockopen($remote, (int) $config['smtp_port'], $errno, $errstr, 20);
    if (!$socket) {
        throw new RuntimeException('SMTP connection failed: ' . $errstr);
    }

    stream_set_timeout($socket, 20);

    smtp_expect($socket, [220]);
    smtp_command($socket, 'EHLO software-strategy.com', [250]);
    smtp_command($socket, 'AUTH LOGIN', [334]);
    smtp_command($socket, base64_encode((string) $config['smtp_user']), [334]);
    smtp_command($socket, base64_encode((string) $config['smtp_password']), [235]);
    smtp_command($socket, 'MAIL FROM:<' . $config['mail_from'] . '>', [250]);
    smtp_command($socket, 'RCPT TO:<' . $config['mail_to'] . '>', [250, 251]);
    smtp_command($socket, 'DATA', [354]);

    $subject = encode_header((string) ($config['mail_subject'] ?? 'Nueva consulta desde software-strategy.com'));
    $fromName = encode_header('Software Strategy');
    $replyTo = trim((string) ($data['email'] ?? ''));

    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . $fromName . ' <' . $config['mail_from'] . '>',
        'To: <' . $config['mail_to'] . '>',
        'Subject: ' . $subject,
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@software-strategy.com>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: Software Strategy Contact Endpoint',
    ];

    if ($replyTo !== '') {
        $headers[] = 'Reply-To: ' . $replyTo;
    }

    $bodyLines = [
        'Nueva consulta desde software-strategy.com',
        '',
        'Nombre: ' . $data['name'],
        'Telefono: ' . $data['phone_number'],
        'Email: ' . $data['email'],
        'Idioma: ' . $data['locale'],
        'Pagina: ' . $data['page'],
        'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? ''),
        'User-Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? ''),
        'Fecha: ' . date('c'),
        '',
        'Mensaje:',
        $data['message'],
    ];

    $message = implode("\r\n", $headers) . "\r\n\r\n" . implode("\r\n", $bodyLines);
    $message = preg_replace('/(?m)^\./', '..', $message) . "\r\n.\r\n";

    fwrite($socket, $message);
    smtp_expect($socket, [250]);
    smtp_command($socket, 'QUIT', [221]);
    fclose($socket);
}

if (!valid_origin($config)) {
    json_response(403, ['success' => false, 'message' => 'invalid_origin']);
}

$rawBody = file_get_contents('php://input') ?: '';
$data = json_decode($rawBody, true);
if (!is_array($data)) {
    $data = $_POST;
}

$name = sanitize_text((string) ($data['name'] ?? ''));
$phone = sanitize_text((string) ($data['phone_number'] ?? ''));
$email = sanitize_email_value((string) ($data['email'] ?? ''));
$message = sanitize_message((string) ($data['message'] ?? ''));
$token = trim((string) ($data['token'] ?? ''));
$action = sanitize_text((string) ($data['action'] ?? ''));
$locale = sanitize_text((string) ($data['locale'] ?? 'es'));
$page = trim((string) ($data['page'] ?? '/contact'));
$honeypot = trim((string) ($data['website'] ?? ''));

if (
    $honeypot !== '' ||
    $name === '' ||
    $phone === '' ||
    $message === '' ||
    $token === '' ||
    contains_header_injection($name) ||
    contains_header_injection($phone) ||
    contains_header_injection($email) ||
    contains_header_injection($page) ||
    contains_header_injection($locale) ||
    ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) ||
    string_length($name) > 120 ||
    string_length($phone) > 40 ||
    string_length($email) > 180 ||
    string_length($message) < 10 ||
    string_length($message) > 4000
) {
    json_response(422, ['success' => false, 'message' => 'invalid_fields']);
}

$expectedAction = (string) ($config['recaptcha_action'] ?? 'contact_form_submit');
if ($action !== $expectedAction) {
    json_response(422, ['success' => false, 'message' => 'invalid_fields']);
}

$verification = verify_recaptcha($token, $config);
$allowedHosts = array_map('strtolower', $config['allowed_hosts'] ?? []);
$hostname = strtolower((string) ($verification['hostname'] ?? ''));
$score = (float) ($verification['score'] ?? 0);

if (
    empty($verification['success']) ||
    $hostname === '' ||
    !in_array($hostname, $allowedHosts, true) ||
    (string) ($verification['action'] ?? '') !== $expectedAction
) {
    json_response(403, ['success' => false, 'message' => 'invalid_recaptcha']);
}

if ($score < (float) ($config['recaptcha_min_score'] ?? 0.5)) {
    json_response(403, ['success' => false, 'message' => 'low_score']);
}

try {
    send_mail_smtp($config, [
        'name' => $name,
        'phone_number' => $phone,
        'email' => $email,
        'message' => $message,
        'locale' => $locale,
        'page' => $page,
    ]);
} catch (Throwable $exception) {
    error_log('[contact-submit] ' . $exception->getMessage());
    json_response(500, ['success' => false, 'message' => 'mail_send_failed']);
}

json_response(200, ['success' => true]);
