import { FC } from "react";
import { FormTextareas } from "../types/FormTextareas";

export const FormTextarea: FC<FormTextareas> = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
  placeholder = "",
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}:
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg p-2 border-gray-200 align-top shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
      />
    </div>
  );
};
