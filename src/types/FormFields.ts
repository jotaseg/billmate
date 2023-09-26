import { ChangeEvent } from "react";

export type FormFields = {
  label: string;
  name: string;
  type: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  example: string;
};
