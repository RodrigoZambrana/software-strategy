export default function Counter({ end = 100, decimals = 0, extraClass = "" }) {
  const formatted = Number(end).toLocaleString("es-UY", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      className={`count-text ${extraClass}`.trim()}
      data-from="0"
      data-to={end}
    >
      {formatted}
    </span>
  );
}

