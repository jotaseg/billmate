import { FC } from "react";
import { FormFields } from "../types/FormFields";

export const FormField: FC<FormFields> = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-xs font-medium text-gray-700 dark:text-gray-200"
      >
        {label}:
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
      />
    </div>
  );
};
