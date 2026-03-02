<?php

declare(strict_types=1);

$publicDir = realpath(__DIR__ . '/../out');
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = rawurldecode(parse_url($requestUri, PHP_URL_PATH) ?: '/');

if ($path === '/') {
    return false;
}

$candidate = realpath($publicDir . $path);
if ($candidate !== false && str_starts_with($candidate, $publicDir) && is_file($candidate)) {
    return false;
}

$htmlCandidate = realpath($publicDir . $path . '.html');
if ($htmlCandidate !== false && str_starts_with($htmlCandidate, $publicDir) && is_file($htmlCandidate)) {
    $_SERVER['SCRIPT_NAME'] = $path . '.html';
    readfile($htmlCandidate);
    return true;
}

$indexCandidate = realpath($publicDir . $path . '/index.html');
if ($indexCandidate !== false && str_starts_with($indexCandidate, $publicDir) && is_file($indexCandidate)) {
    $_SERVER['SCRIPT_NAME'] = rtrim($path, '/') . '/index.html';
    readfile($indexCandidate);
    return true;
}

$notFound = realpath($publicDir . '/404.html');
if ($notFound !== false && is_file($notFound)) {
    http_response_code(404);
    readfile($notFound);
    return true;
}

return false;
