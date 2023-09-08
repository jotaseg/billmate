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
      <label htmlFor={name}>{label}:</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};
