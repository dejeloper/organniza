import clsx from "clsx";

const PriceChangeIndicator = ({ variant }) => {
  const colorClass = clsx({
    "text-green-500": variant === "up",
    "text-red-500": variant === "down",
    "text-gray-500": variant === "same",
  });

  const text =
    {
      up: "↑ Subió de precio",
      down: "↓ Bajó de precio",
      same: "= Precio estable",
    }[variant] || "Sin información";

  return <span className={clsx("text-sm", colorClass)}>{text}</span>;
};

export default PriceChangeIndicator;
