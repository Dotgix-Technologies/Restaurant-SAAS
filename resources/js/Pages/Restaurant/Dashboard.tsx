
import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { faEdit } from '@fortawesome/free-regular-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

interface KycDocument {
    id: number;
    type: string;
    document_path: string;
    restaurant_id: number;
}

interface Restaurant {
    id: number;
    owner_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    location: string;
    DBA: string;
    cuisine_type: string;
    restaurant_type: string;
    license_no: string;
    subscription_plan: string;
    status: string;
    created_at: string;
    updated_at: string;
    kyc_documents: KycDocument[];
}

interface User {
    id: number;
    name: string;
    email: string;
    restaurants?: Restaurant[];
}
interface InertiaProps {
    auth: {
        user: User;
    };
    restaurants?: {
        data: Restaurant[];
        [key: string]: any;
    };
}
export default function Dashboard() {
    const { auth, restaurants } = usePage().props as InertiaProps;
    const user = auth?.user;

    const restaurantList: Restaurant[] = restaurants?.data ?? [];
    return (
        <RestaurantLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in as <strong>{user.name}</strong>

                        </div>
                    </div>

                    {restaurantList.length > 0 ? (
                        restaurantList.map((restaurant) => (
                            <div
                                key={restaurant.id}
                                className="p-6 bg-white rounded shadow dark:bg-gray-800 dark:text-white"
                            >
                                <div className="flex col p-2 m-2 justify-between">  <h3 className="text-lg font-bold">{restaurant.name}</h3>
                                    <h6><a href={`restaurants/${restaurant.id}`}><FontAwesomeIcon icon={faEdit} /> </a></h6></div>

                                <p>Email: {restaurant.email}</p>
                                <p>Phone: {restaurant.phone}</p>
                                <p>Address: {restaurant.address}</p>
                                <p>Status: {restaurant.status}</p>

                                <div className="mt-4">
                                    <h4 className="font-semibold">KYC Documents:</h4>
                                    {restaurant.kyc_documents?.length > 0 ? (
                                        <ul className="list-disc list-inside">
                                            {restaurant.kyc_documents.map((doc) => (
                                                <li key={doc.id}>
                                                    {doc.type} -{' '}
                                                    <a
                                                        href={doc.document_path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 underline"
                                                    >
                                                        View Document
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-400">No KYC documents uploaded.</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">No restaurants found.</p>
                    )}
                </div>
            </div>
        </RestaurantLayout>
    );
}
