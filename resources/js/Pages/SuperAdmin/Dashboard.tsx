import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';


interface Props {
    admin: String
}
export default function Dashboard({admin}:Props) {
    return (
        <SuperAdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                  Super Admin  Dashboard 
                </h2>
            }
        >
            
            <Head title="Dashboard" />

            You're logged in! {admin}
        </SuperAdminLayout>
    );
}
