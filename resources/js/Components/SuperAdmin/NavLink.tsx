import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
          className={
        'flex w-full items-center  border-b-2 py-2 px-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-gradient-to-r dark:from-gray-700 dark:via-white dark:to-gray-600 from-slate-900 via-blue-800 to-slate-700 dark:text-gray-700 text-gray-200 border-gray-400 dark:border-gray-50'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300') +
                className
            }
        >   
            {children}
        </Link>
    );
}
