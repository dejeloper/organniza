import clsx from "clsx";

const PriceChangeIndicator = ({ variant }) => {
  const colorClass = clsx({
    "text-green-600": variant === "up",
    "text-red-500": variant === "down",
    "text-gray-700": variant === "same",
  });

  const text =
    {
      up: "↑ Subió de precio",
      down: "↓ Bajó de precio",
      same: "= Precio estable",
    }[variant] || "Sin información";

  return (
    <span className={clsx("text-sm font-semibold", colorClass)}>{text}</span>
  );
};

export default PriceChangeIndicator;
