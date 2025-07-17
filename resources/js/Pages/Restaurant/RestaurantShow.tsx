import FormSelect from '@/Components/Restaurant/FormSelect';
import InputError from '@/Components/Restaurant/InputError';
import InputLabel from '@/Components/Restaurant/InputLabel';
import LocationInput from '@/Components/Restaurant/InputLocation';
import TextInput from '@/Components/Restaurant/TextInput';
import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { User } from '@/types';
import { Domain } from '@/types/domains';
import { Restaurant, restaurantFields, RestaurantFormData } from '@/types/restarurant';
import { Tenant } from '@/types/tenant';
import { faEdit } from '@fortawesome/free-regular-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, FormEventHandler, useState } from 'react';
import Swal from 'sweetalert2'
import { router } from '@inertiajs/react';
import withReactContent from 'sweetalert2-react-content'
import { kycDocumentTypesOptions as KycDocOptions } from '@/types/kyc_documents';
import KycUpdateForm from '@/Components/Restaurant/KycUpdateForm';
import CreateTenant from '@/Components/Restaurant/CreateTenant';
const MySwal = withReactContent(Swal)

interface InertiaProps {
    auth: {
        user: User;
    };
    restaurant?: {
        data: Restaurant;
        [key: string]: any;
    };
}
export default function Dashboard() {
    const { auth, restaurant } = usePage().props as InertiaProps;
    const user = auth?.user;
    const restaurantData = restaurant?.data;
    const initialFormData: RestaurantFormData = {
        name: restaurantData?.name ?? "",
        email: restaurantData?.email ?? "",
        phone: restaurantData?.phone ?? "",
        address: restaurantData?.address ?? "",
        DBA: restaurantData?.DBA ?? "",
        cuisine_type: restaurantData?.cuisine_type ?? "",
        restaurant_type: restaurantData?.restaurant_type ?? "",
        license_no: restaurantData?.license_no ?? "",
        status: restaurantData?.status ?? "",
        subscription_plan: restaurantData?.subscription_plan ?? "",
        logo: restaurantData?.logo ?? "",
        location: restaurantData?.location ?? "",
        tenant: String(restaurantData?.tenant?.id ?? ""), // 👈 Convert tenant to string id
    };

    const { data, setData, put, processing, errors, reset, progress } = useForm<RestaurantFormData>(initialFormData);
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    const [preview, setPreview] = useState<string>(
        restaurantData?.logo ? `/${restaurantData.logo}` : ""
    );

    useEffect(() => {
        // Whenever restaurantData changes (example: after update), refresh the form data
        setData({
            name: restaurantData?.name ?? "",
            email: restaurantData?.email ?? "",
            phone: restaurantData?.phone ?? "",
            address: restaurantData?.address ?? "",
            DBA: restaurantData?.DBA ?? "",
            logo: restaurantData?.logo ?? "",
            cuisine_type: restaurantData?.cuisine_type ?? "",
            license_no: restaurantData?.license_no ?? "",
            location: restaurantData?.location ?? "",
            restaurant_type: restaurantData?.restaurant_type ?? "",
            status: restaurantData?.status ?? "",
            subscription_plan: restaurantData?.subscription_plan ?? "",
            tenant: restaurantData?.tenant ?? [],
        });
    }, [restaurantData]);
    console.log(restaurantData?.logo, data);

    const UpdateInformation: FormEventHandler = async (e) => {
        e.preventDefault();
        console.log(data)
        put(route('Restaurant.restaurant.update', restaurantData?.id), {
            method: 'put',
            preserveScroll: true,
            onStart: () => {
                console.log("Submitting...");
            },
            onProgress: (event) => {
                console.log("Progress:", event);
            },
            onFinish: () => {
                console.log("Finished");
            },
            onSuccess: () => {
                MySwal.fire({
                    toast: true,
                    title: 'Success!',
                    text: flash?.success || 'Restaurant updated successfully!',
                    icon: 'success',
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false
                });
            },
            onError: (errors) => {
                let errorMessage = 'Something went wrong';
                if (typeof errors === 'object' && errors !== null) {
                    errorMessage = Object.values(errors).flat().join('\n');
                }
                MySwal.fire({
                    toast: true,
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    position: 'top-end',
                    showConfirmButton: false
                });
            }
        });
    };





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
                    {restaurantData ? (
                        <div className="p-6 bg-white rounded shadow dark:bg-gray-800 dark:text-white space-y-12">
                            <form
                                onSubmit={UpdateInformation}
                                className="space-y-4"
                            >
                                <input type="hidden" name="id" value={restaurantData.id} />

                                <h3 className="text-lg font-semibold">Restaurant Details</h3>

                                {/* Fields */}
                                {["name",
                                    "email",
                                    "phone",
                                    "address",
                                    "DBA",
                                    "cuisine_type",
                                    "license_no",
                                ].map(field => (
                                    <div key={field}>
                                        <label className="block font-semibold mb-1 capitalize">{field.replace("_", " ")}</label>
                                        <TextInput
                                            id={field}
                                            name={field}
                                            value={data[field as keyof RestaurantFormData]}
                                            onChange={(e) =>
                                                setData(field as keyof RestaurantFormData, e.target.value)
                                            }


                                            required
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                ))}
                                <input
                                    type="file"
                                    name="logo"
                                    id="logo"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData("logo", file);
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}

                                />
                                {preview && (
                                    <div className="mt-2">
                                        <img
                                            src={preview}
                                            alt="Logo Preview"
                                            className="h-24 w-24 object-cover border rounded"
                                        />
                                    </div>
                                )}

                                <LocationInput
                                    value={data.location}
                                    setData={setData}
                                    logo={data.logo}
                                    errors={errors}
                                />

                                <input type="hidden" name="location" value={data.location} />
                                {/* Restaurant Type */}

                                <div className="w-full sm:w-1/2">
                                    <InputLabel htmlFor="restaurant_type" value="Restaurant Type" />
                                    <div className="mt-2">
                                        <FormSelect
                                            defaultValue={data.restaurant_type}
                                            options={[{ value: "OnSite", label: "OnSite" },
                                            { value: "CloudKitchen", label: "CloudKitchen" },
                                            { value: "Hybrid", label: "Hybrid" }]}
                                            value={data.restaurant_type}
                                            onChange={(value) => (setData("restaurant_type", value))}
                                        />
                                        <InputError message={errors.restaurant_type} className="mt-2" />
                                    </div>
                                </div>
                                {/* Status */}
                                <div className="w-full sm:w-1/2">
                                    <InputLabel htmlFor="status" value="Restaurant Status" />
                                    <div className="mt-2">
                                        <FormSelect defaultValue={data.status}
                                            options={[
                                                { value: "verified", label: "Verified", hidden: true },
                                                { value: "pending_verification", label: "Pending Verification", hidden: true },
                                                { value: "suspended", label: "Suspended", hidden: true },
                                                { value: "Approved", label: "Approved", hidden: true },
                                                { value: "Active", label: "Active" },
                                                { value: "Offline", label: "Offline" },
                                                { value: "Vacation", label: "Vacation" },
                                                { value: "Deactivaed", label: "Deactivaed" },
                                                { value: "Suspended", label: "Suspended" }]}
                                            value={data.status}
                                            onChange={(value) => (setData("status", value))}
                                        />
                                        <InputError message={errors.restaurant_type} className="mt-2" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`px-4 py-2 text-white rounded ${processing ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2 inline-block text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Restaurant"
                                    )}
                                    {progress && (
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${progress.percentage}%` }}
                                            ></div>
                                        </div>
                                    )}

                                </button>

                            </form>

                            {/* 2️⃣ KYC Documents Form */}
                            <KycUpdateForm restaurantType={data.restaurant_type} restaurantId={restaurantData.id} existingDocuments={restaurantData.kyc_documents} />
                            {/* 3️⃣ Tenants & Domains Form */}
                            {data.tenant ? (
                                <>
                                    {data.tenant.domain ? (
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold">Tenant Domain</h3>
                                            <a
                                                href={`https://${data.tenant.domain.domain}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                {data.tenant.domain.domain}
                                            </a>
                                        </div>
                                    ) : (
                                        <CreateTenant restaurantId={restaurantData.id} />
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-gray-400">This tenant has no tenant yet.</p>
                            )}


                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">No restaurant data found.</p>
                    )}


                </div>
            </div>
        </RestaurantLayout>
    );
}
