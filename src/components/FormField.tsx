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
    <div>
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
