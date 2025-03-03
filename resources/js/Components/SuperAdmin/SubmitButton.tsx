import { ButtonHTMLAttributes } from 'react';

export default function SubmitButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `mb-4 p-2 bg-gradient-to-r from-gray-200 via-white to-gray-100 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900  rounded-t-lg ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
