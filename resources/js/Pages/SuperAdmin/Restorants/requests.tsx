import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';
import React from 'react'
interface Props {
    tenants: Array<any>
}
const Requests: React.FC<Props> = ({ tenants }) => {
    return (
        <SuperAdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                   Restaurants Registration Requests
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Tenant Requests</h2>
                <ul>
                    {tenants.length > 0 ? (
                        tenants.map((tenant) => (
                            <li key={tenant.id} className="p-3 border-b">
                                <p><strong>ID:</strong> {tenant.id}</p>
                                <p><strong>User Name:</strong> {tenant.user.name}</p>
                                <p><strong>Email:</strong> {tenant.user.email}</p>
                                <p><strong>Status:</strong> {tenant.data.status || 'N/A'}</p>
                                <p><strong>Created At:</strong> {new Date(tenant.created_at).toLocaleString()}</p>
                            </li>
                        ))
                    ) : (
                        <p>No tenant requests found.</p>
                    )}
                </ul>
            </div>

        </SuperAdminLayout>
    )
}

export default Requests
