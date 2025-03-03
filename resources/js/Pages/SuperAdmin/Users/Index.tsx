import Table from '@/Components/SuperAdmin/Table';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
interface Props {
    users: Array<any>
}
const index: React.FC<Props> = ({ users }) => {
    const columns = [
        { key: "name", label: "Author", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "role", label: "Role", type: "text" },
        { key: "email_verified_at", label: "Email Verified At", type: "date" },
        {
            key: "status",
            label: "Status",
            type: "status",
            conditions: { approved: "bg-green-500", verified: "bg-green-500", pending_verification: "bg-red-500", suspended: "bg-red-800" }
        },
        { key: "created_at", label: "Joined", type: "date" },
        {
            key: "action",
            label: "Actions",
            type: "action",
            actions: [
                { label: <FontAwesomeIcon icon={faPenToSquare} flip="horizontal" size="lg" />, route: "/SuperAdmin/users/edit", class: "bg-transparent-500" },
                { label: "Delete", route: "/SuperAdmin/users/delete", class: "bg-red-500" }
            ]
        }
    ];
    return (
        <SuperAdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Dashboard" />

            <Table className="mt-4" title={'Users'} columns={columns} data={users} />


        </SuperAdminLayout>
    )
}

export default index
