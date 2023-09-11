import { FC } from "react";
import { Buttons } from "../types/Buttons";

export const Button: FC<Buttons> = ({ onClick, type = "button", label }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-block rounded border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white px-12 py-3 text-sm font-medium text-white hover:bg-transparent focus:outline-none focus:ring"
    >
      {label}
    </button>
  );
};
