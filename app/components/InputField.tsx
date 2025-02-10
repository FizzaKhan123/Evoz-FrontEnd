import {  ChangeEvent } from "react";

type InputFieldProps = {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, name }) => (
  <div className="mb-4">
    <label className="block text-gray-300 text-sm font-semibold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);

export default InputField;