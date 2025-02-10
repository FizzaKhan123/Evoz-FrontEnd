import { ChangeEvent } from "react";

type RadioFieldProps = {
    label: string;
    value: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
  };
  
  const RadioField: React.FC<RadioFieldProps> = ({ label, value, checked, onChange, name }) => (
    <label className="flex items-center text-gray-300 text-sm">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      {label}
    </label>
  );

  export default RadioField;