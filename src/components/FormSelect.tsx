import { FC } from "react";
import { FormSelects } from "../types/FormSelect";

const currencyOptions = [
  { value: "USD", label: "U.S. dollar (USD) - US$" },
  { value: "EUR", label: "Euro (EUR) - €" },
  { value: "JPY", label: "Japanese yen (JPY) - ¥ / 円" },
  { value: "GBP", label: "Sterling (GBP) - £" },
  { value: "AUD", label: "Australian dollar (AUD) - A$" },
  { value: "CAD", label: "Canadian dollar (CAD) - C$" },
  { value: "CHF", label: "Swiss franc (CHF) - CHF" },
  { value: "CNY", label: "Renminbi (CNY) - ¥ / 元" },
  { value: "HKD", label: "Hong Kong dollar (HKD) - HK$" },
  { value: "NZD", label: "New Zealand dollar (NZD) - NZ$" },
  { value: "SEK", label: "Swedish krona (SEK) - kr" },
  { value: "KRW", label: "South Korean won (KRW) - ₩ / 원" },
  { value: "SGD", label: "Singapore dollar (SGD) - S$" },
  { value: "NOK", label: "Norwegian krone (NOK) - kr" },
  { value: "INR", label: "Indian rupee (INR) - ₹" },
  { value: "MXN", label: "Mexican peso (MXN) - $" },
  { value: "ZAR", label: "South African rand (ZAR) - R" },
  { value: "BRL", label: "Brazilian real (BRL) - R$" },
  { value: "TRY", label: "Turkish lira (TRY) - ₺" },
  { value: "RUB", label: "Russian ruble (RUB) - ₽" },
  { value: "TWD", label: "New Taiwan dollar (TWD) - NT$" },
  { value: "DKK", label: "Danish krone (DKK) - kr" },
  { value: "PLN", label: "Polish złoty (PLN) - zł" },
  { value: "THB", label: "Thai baht (THB) - ฿" },
  { value: "IDR", label: "Indonesian rupiah (IDR) - Rp" },
  { value: "CZK", label: "Czech koruna (CZK) - Kč" },
  { value: "HUF", label: "Hungarian forint (HUF) - Ft" },
  { value: "ILS", label: "Israeli new shekel (ILS) - ₪" },
  { value: "CLP", label: "Chilean peso (CLP) - CLP$" },
  { value: "PHP", label: "Philippine peso (PHP) - ₱" },
  { value: "AED", label: "UAE dirham (AED) - د.إ" },
  { value: "SAR", label: "Saudi riyal (SAR) - ﷼" },
  { value: "MYR", label: "Malaysian ringgit (MYR) - RM" },
  { value: "COP", label: "Colombian peso (COP) - COL$" },
  { value: "RON", label: "Romanian leu (RON) - L" },
  { value: "PEN", label: "Peruvian sol (PEN) - S/" },
  { value: "ARS", label: "Argentine peso (ARS) - ARG$" },
  { value: "BHD", label: "Bahraini dinar (BHD) - .د.ب" },
  { value: "BGN", label: "Bulgarian lev (BGN) - BGN" },
];

export const FormSelect: FC<FormSelects> = ({
  label,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
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
