import { XIcon } from "@heroicons/react/solid";
import { InputHTMLAttributes } from "react";

export default function ConditionInput({
  onChange,
  value,
  onClear,
}: {
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  onClear: () => void;
}) {
  return (
    <div className="relative w-full">
      <input
        onChange={onChange}
        value={value}
        placeholder="Choose a condition"
        className="appearance-none rounded w-full h-12 text-gray-700 leading-tight focus:outline-none"
      />
      <span
        onClick={onClear}
        className={`absolute right-0 top-0 h-12 w-12 bg-white p-3 ${
          !value ? "hidden" : ""
        }`}
      >
        <XIcon />
      </span>
    </div>
  );
}
