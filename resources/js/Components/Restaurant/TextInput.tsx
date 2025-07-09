import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-tl-lg border-gray-50 shadow-sm focus:border-blue-900 focus:ring-blue-900 dark:border-gray-700 bg-gradient-to-r from-gray-300 via-white to-gray-200 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500 ' +
                className
            }
            ref={localRef}
        />
    );
});
