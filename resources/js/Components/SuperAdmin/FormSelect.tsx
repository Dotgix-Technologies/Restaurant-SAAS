import React from "react";

interface SelectProps {
    options: { value: string; label: string; hidden?: boolean }[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    defaultValue: string;
}

const FormSelect: React.FC<SelectProps> = ({ options, value, onChange, className, defaultValue }) => {
    console.log(value);
    
    return (
        <div className={`w-full  ${className}`}>


            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-tl-lg  bg-transparent dark:bg-blue-950  text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition"
            >
                {options.map((option) => (
                    <option key={option.value} hidden={option?.hidden} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;
