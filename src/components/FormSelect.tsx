import { FC } from "react";
import { FormSelects } from "../types/FormSelect";
import { currencyOptions } from "../utils/currencyOptions";

export const FormSelect: FC<FormSelects> = ({
  label,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
      >
        {label}:
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
      >
        {currencyOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
