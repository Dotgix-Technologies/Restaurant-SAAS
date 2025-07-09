import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Sidebar from '@/Pages/SuperAdmin/Components/Sidebar';
import Navbar from '@/Pages/SuperAdmin/Components/Navbar';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AppWrapper from './AppWrapper';
const MySwal = withReactContent(Swal);
export default function SuperAdminLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <AppWrapper>
            <div className="scrollbar-thin min-h-screen transition-all duration-500 bg-gradient-to-tr -to-r from-gray-200 via-white to-gray-100 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900">
                <Navbar isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen} />
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />


                <div className={`p-4 flex-1  transition-all duration-300 ${isSidebarOpen ? "md:ml-80" : "md:ml-28"} sm:ml-0`}>
                    {header && (
                        <header className="mt-16 md:mt-12 ml-2  bg-transparent">
                            {header}
                        </header>
                    )}
                    <main className="scrollbar-thin bg-gradient-to-r rounded-xl from-gray-300 via-white to-gray-200 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900 dark:text-gray-200 p-2">

                        {children}
                    </main>
                </div>
            </div>
        </AppWrapper>
    );
}
