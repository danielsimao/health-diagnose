import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  variant: "primary" | "white";
  className?: string;
  disable?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const DISABLE_CLASSNAME = "opacity-50 cursor-default";

const PRIMARY_CLASSNAME = "bg-blue-500 hover:bg-blue-600 text-gray-200";

const WHITE_CLASSNAME =
  "bg-white border border-blue-500 hover:border-blue-600 text-blue-500";

const DEFAULT_CLASSNAME =
  "px-4 py-3 rounded font-semibold transition duration-200 each-in-out";

export default function Button({
  variant = "primary",
  className = "",
  disable = false,
  onClick,
  children,
  type,
}: ButtonProps) {
  const btnClassName = `${
    variant === "white" ? WHITE_CLASSNAME : PRIMARY_CLASSNAME
  } ${disable ? DISABLE_CLASSNAME : ""} ${className}`;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${DEFAULT_CLASSNAME} ${btnClassName}`}
    >
      {children}
    </button>
  );
}
