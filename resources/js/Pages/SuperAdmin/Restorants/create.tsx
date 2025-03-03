import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';
import React from 'react'
interface Props {
    clients: Array<any>
}
const index: React.FC<Props> = ({ clients }) => {
    return (
        <SuperAdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                   Register new Restorant
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="p-6 shadow-md rounded-lg">
                
            </div>

        </SuperAdminLayout>
    )
}

export default index
