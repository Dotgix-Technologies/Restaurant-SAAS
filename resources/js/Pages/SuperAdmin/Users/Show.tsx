import Table, { Column } from '@/Components/SuperAdmin/Table';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import FormSelect from '@/Components/Restaurant/FormSelect';
import TextInput from '@/Components/Restaurant/TextInput';
import InputError from '@/Components/Restaurant/InputError';
import InputLabel from '@/Components/Restaurant/InputLabel';
import SubmitButton from '@/Components/Restaurant/SubmitButton';
import { machine } from 'node:os';
import InputLocation from '@/Components/SuperAdmin/InputLocation';
import Create from './Create';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { kycDocumentTypesOptions as KycDocOption, KycDocument } from '@/types/kyc_documents';
import { Restaurant } from '@/types/restarurant';
import { error } from 'node:console';
const MySwal = withReactContent(Swal)
interface Props {
    user: any;
}

const Show: React.FC<Props> = ({ user }) => {
    const { flash } = usePage().props as { flash?: { success?: string, error?: String } };
    const [ShowRestaurantForm, setShowRestaurantForm] = useState<boolean>(false)
    const [ShowTenantForm, setShowTenantForm] = useState<boolean>(false)
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(false);
    if (!user) {
        return <p className="text-center text-red-500">User not found.</p>;
    }
    const { data, setData, progress, post, processing, errors, reset } = useForm<{
        name: string;
        status: string;
        restroName: string;
        restroEmail: string;
        restroPhone: string;
        restrologo: File | null;
        restroaddress: string;
        restrolocation: string;
        restroDBA: string;
        restrocuisine_type: string;
        restrorestaurant_type: string;
        restrolicense_no: string;
        restraStatus: string;
        tenenrestroId: string;
        tenentDomain: string;
        kycrestroId: string;
        kycDocumentType: string;
        kycDocumentName: string;
        kycDocuments: File | null;
    }>({
        name: user.name,
        status: user.status,
        restrologo: null,
        restroName: '',
        restroEmail: '',
        restroPhone: '',
        restroaddress: '',
        restrolocation: '',
        restroDBA: '',
        restrocuisine_type: '',
        restrorestaurant_type: '',
        restrolicense_no: '',
        restraStatus: '',
        tenenrestroId: '',
        tenentDomain: '',
        kycrestroId: '',
        kycDocumentType: '',
        kycDocumentName: '',
        kycDocuments: null,
    });


    const statusOptions = [
        { value: "verified", label: "Verified" },
        { value: "pending_verification", label: "Pending Verification" },
        { value: "suspended", label: "Suspended" },
    ];
    const restroCuisineOptions = [
        { value: "FastFood", label: "FastFood" },
        { value: "Italian", label: "Italian" },
        { value: "Chinese", label: "Chinese" },
        { value: "Pakistani", label: "Pakistani" },
        { value: "Indian", label: "Indian" },
        { value: "Mexican", label: "Mexican" },
        { value: "Thai", label: "Thai" },
        { value: "Japanese", label: "Japanese" },
        { value: "Mediterranean", label: "Mediterranean" },
        { value: "American", label: "American" },
        { value: "French", label: "French" },
        { value: "Vegan", label: "Vegan" },
        { value: "Other", label: "Other" },
    ];
    const restroStatusOptions = [
        { value: "verified", label: "Verified" },
        { value: "pending_verification", label: "Pending Verification" },
        { value: "suspended", label: "Suspended" },
        { value: "Approved", label: "Approved" },
        { value: "Active", label: "Active" },
        { value: "Offline", label: "Offline" },
        { value: "Vacation", label: "Vacation" },
        { value: "Deactivaed", label: "Deactivaed" },
        { value: "Suspended", label: "Suspended" },
    ]
    const restrorestaurantOptions = [
        { value: "OnSite", label: "OnSite" },
        { value: "CloudKitchen", label: "CloudKitchen" },
        { value: "Hybrid", label: "Hybrid" },
    ];

    const Updateuser: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('user data', user.id, data);
        try {
            post(route('SuperAdmin.user.update', user.id), {


                onSuccess: () => {
                    let successMessage = flash?.success;
                    MySwal.fire({
                        toast: true,
                        title: flash?.success || 'Success!',
                        text: successMessage,
                        icon: 'success',
                        position: 'top-end',
                        timer: 3000,
                        showConfirmButton: false
                    });
                },
                onError: (error) => {
                    let errorMessage = 'An error occurred!';
                    if (typeof error === 'object' && error !== null) {
                        errorMessage = Object.values(error).flat().join('\n');
                    } else if (typeof error === 'string') {
                        errorMessage = error;
                    }
                    MySwal.fire({
                        toast: true,
                        title: flash?.error || 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        position: 'top-end',
                        showConfirmButton: false
                    });
                }
            });
        } catch (error) {
            let errorMessage = 'An error occurred!';
            if (typeof error === 'object' && error !== null) {
                errorMessage = Object.values(error).flat().join('\n');
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            MySwal.fire({
                toast: true,
                title: flash?.error || 'Error!',
                text: errorMessage,
                icon: 'error',
                position: 'top-end',
                showConfirmButton: false,
            });
        }
    };
    const CreateRestaurant: FormEventHandler = (e) => {
        e.preventDefault();
        try {
            post(route('SuperAdmin.restaurant.create', user.id), {
                onSuccess: () => {
                    
                    reset();
                    let successMessage = flash?.success;
                    MySwal.fire({
                        toast: true,
                        title: flash?.success || 'Success!',
                        text: successMessage,
                        icon: 'success',
                        position: 'top-end',
                        timer: 3000,
                        showConfirmButton: false
                    });
                    setShowRestaurantForm(prev => !prev)
                },
                onError: (error) => {
                    let errorMessage = 'An error occurred!';
                    if (typeof error === 'object' && error !== null) {
                        errorMessage = Object.values(error).flat().join('\n');
                    } else if (typeof error === 'string') {
                        errorMessage = error;
                    }
                    MySwal.fire({
                        toast: true,
                        title: flash?.error || 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        position: 'top-end',
                        showConfirmButton: false
                    });
                }
            });
        } catch (error) {
            let errorMessage = 'An error occurred!';
            if (typeof error === 'object' && error !== null) {
                errorMessage = Object.values(error).flat().join('\n');
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            MySwal.fire({
                toast: true,
                title: flash?.error || 'Error!',
                text: errorMessage,
                icon: 'error',
                position: 'top-end',
                showConfirmButton: false,
            });
        }
    }
    const CreateTenant: FormEventHandler = (e) => {
        e.preventDefault();

        try {
            post(route('SuperAdmin.tenent.create', user.id), {
                onSuccess: () => {
                    reset();
                    let successMessage = flash?.success;
                    MySwal.fire({
                        toast: true,
                        title: flash?.success || 'Success!',
                        text: successMessage,
                        icon: 'success',
                        position: 'top-end',
                        timer: 3000,
                        showConfirmButton: false
                    });
                },
                onError: (error) => {
                    let errorMessage = 'An error occurred!';
                    if (typeof error === 'object' && error !== null) {
                        errorMessage = Object.values(error).flat().join('\n');
                    } else if (typeof error === 'string') {
                        errorMessage = error;
                    }
                    MySwal.fire({
                        toast: true,
                        title: flash?.error || 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        position: 'top-end',
                        showConfirmButton: false
                    });
                }
            });
        } catch (error) {
            let errorMessage = 'An error occurred!';
            if (typeof error === 'object' && error !== null) {
                errorMessage = Object.values(error).flat().join('\n');
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            MySwal.fire({
                toast: true,
                title: flash?.error || 'Error!',
                text: errorMessage,
                icon: 'error',
                position: 'top-end',
                showConfirmButton: false,
            });
        }
    }
    const UploadDocument: FormEventHandler = (e) => {
        e.preventDefault();
        try {

            post(route('SuperAdmin.restaurant.document.upload', data.kycrestroId), {
                onSuccess: () => {
                    reset();
                    let successMessage = flash?.success;
                    MySwal.fire({
                        toast: true,
                        title: flash?.success || 'Success!',
                        text: successMessage,
                        icon: 'success',
                        position: 'top-end',
                        timer: 3000,
                        showConfirmButton: false
                    });
                    setData({ ...data, kycrestroId: '', kycDocumentType: '', kycDocumentName: '', kycDocuments: null, })
                },
                onError: (error) => {
                    let errorMessage = 'An error occurred!';
                    if (typeof error === 'object' && error !== null) {
                        errorMessage = Object.values(error).flat().join('\n');
                    } else if (typeof error === 'string') {
                        errorMessage = error;
                    }
                    MySwal.fire({
                        toast: true,
                        title: flash?.error || 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        position: 'top-end',
                        showConfirmButton: false
                    });
                }
            });
        } catch (error) {
            let errorMessage = 'An error occurred!';
            if (typeof error === 'object' && error !== null) {
                errorMessage = Object.values(error).flat().join('\n');
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            MySwal.fire({
                toast: true,
                title: flash?.error || 'Error!',
                text: errorMessage,
                icon: 'error',
                position: 'top-end',
                showConfirmButton: false,
            });
        }
    }
    const columns: Column[] = [
        { key: "name", label: "Name", type: "text" },
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
    ];
    const restaurantColumns: Column[] = [
        { key: "id", label: "ID", type: "text" },
        { key: "name", label: "Restaurant Name", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone", label: "Phone", type: "text" },
        { key: "address", label: "Address", type: "text" },
        { key: "location", label: "Location", type: "text" },
        { key: "DBA", label: "DBA(Doing Buisness ass)", type: "text" },
        { key: "cuisine_type", label: "Cuisine", type: "text" },
        { key: "restaurant_type", label: "RESTAURANT TYPE", type: "text" },
        { key: "license_no", label: "licience no", type: "text" },
        { key: "subscription_plan", label: "subscription", type: "status", conditions: { Free: "bg-gray-500", Standard: "bg-yellow-500", Premium: "bg-green-500" } },
        { key: "kyc_documents", label: "KycDocuments", type: "nestedColumns", nestedColumns: [{ key: "type", label: "Doc Type", type: "text" }, { key: "document_path", label: "Document", type: "file" }] },
        { key: "status", label: "status", type: "status", conditions: { Active: "bg-green-500", Offline: "bg-yellow-500", Vacation: "bg-yellow-500", Deactivaed: "bg-red-500", Approved: "bg-green-500", verified: "bg-green-500", pending_verification: "bg-red-500", Suspended: "bg-red-800" } },
        { key: "created_at", label: "Joined", type: "date" },
        { key: "logo", label: "Logo", type: "image" },
        { key: "updated_at", label: "last updated", type: "date" },
        {
            key: "action",
            label: "Actions",
            type: "putaction",
            putactions: {
                route: "/superAdmin/restaurant/action",
                class: "bg-gray-200 dark:bg-blue-950",
                options: [
                    { value: "verified", label: "Verified" },
                    { value: "pending_verification", label: "Pending Verification" },
                    { value: "suspended", label: "Suspended" },
                    { value: "Approved", label: "Approved" },
                    { value: "Active", label: "Active" },
                    { value: "Offline", label: "Offline" },
                    { value: "Vacation", label: "Vacation" },
                    { value: "Deactivaed", label: "Deactivaed" },
                    { value: "Suspended", label: "Suspended" },
                ]
            }
        },
    ];
    const tenantColumns: Column[] = [
        { key: "id", label: "ID", type: "text" },
        { key: "tenancy_db_name", label: "Database name", type: "text" },
        { key: "domain", label: "Domains", type: "nestedColumns", nestedColumns: [{ key: "domain", label: "Domain", type: "text" }, { key: "created_at", label: "Created At", type: "date" }] },
        { key: "created_at", label: "Created at", type: "date" },
        { key: "updated_at", label: "Updated at", type: "date" },
    ];
    const kycColumns: Column[] = [
        { key: "id", label: "ID", type: "text" },
        { key: "restaurant", label: "Restaurant", type: "nestedColumns", nestedColumns: [{ key: "name", label: "Restaurant", type: "text" }, { key: "id", label: "Restaurant id", type: "text" }] },
        { key: "type", label: "KYC Document Type", type: "text" },
        { key: "status", label: "status", type: "status", conditions: { pending_approval: "bg-yellow-800", Approved: "bg-green-500", Rejected: "bg-red-500" } },
        { key: "document_path", label: "Document", type: "file" },
        { key: "created_at", label: "Uploaded At", type: "date" },
        { key: "updated_at", label: "Updated At", type: "date" },
        {
            key: "action",
            label: "Actions",
            type: "putaction",
            putactions: {
                route: "/SuperAdmin/kycDoc/action",
                class: "bg-gray-200 dark:bg-blue-950",
                options: [
                    { value: "pending_approval", label: "Pending Approval" },
                    { value: "Approved", label: "Approve" },
                    { value: "Rejected", label: "Reject" },
                ]
            }
        },
    ];
    const userRole = user?.role || "unknown";
    const tenants = user?.tenants || [];
    const restaurants = user?.restaurants || [];
    const domains = user?.tenants?.[0]?.domain || [];
    const kycDocuments: KycDocument[] = restaurants
        .flatMap((r: { kyc_documents: any; }) => r.kyc_documents ?? [])
        .sort((a: { status: string; }, b: { status: string; }) => {
            if (a.status === 'pending_approval' && b.status !== 'pending_approval') return -1;
            if (a.status !== 'pending_approval' && b.status === 'pending_approval') return 1;
            return 0;
        });

    const selectedRestaurant: Restaurant | undefined = restaurants.find(
        (restro: { id: number; }) => restro.id === Number(data.kycrestroId)
    );
    const kycDocumentTypesOptions = selectedRestaurant ? KycDocOption[selectedRestaurant.restaurant_type] : [];
    console.log(restaurants);
    const checkDomainAvailability = async (domain: String) => {
        if (!domain) {
            setIsValid(null); // Reset state if input is empty
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`/superAdmin/tenant/check/domain/${domain}`);
            errors.tenentDomain = response.data.available ? '' : 'Domain is already taken';
            setIsValid(response.data.available);
        } catch (error) {
            console.error("Error checking domain:", error);
            setIsValid(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log('logining', restaurants[data.kycrestroId], data, kycDocumentTypesOptions);
    }, [data, kycDocumentTypesOptions])
    useEffect(() => {
        const timeout = setTimeout(() => {
            checkDomainAvailability(data.tenentDomain);
        }, 500);
        return () => clearTimeout(timeout);
    }, [data.tenentDomain]);
    return (
        <SuperAdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User Details
                </h2>
            }
        >
            <Head title="User Details" />

            {/* User Basic Info */}
            <Table className="mt-4 "
                title="User Details"
                headcustomaction={
                    user.status === 'pending_verification' ? (
                        <Link href={`/superAdmin/users/approved/${user.id}`} className="text-white bg-green-500 px-2 py-1 rounded-full text-xs">
                            Approve
                        </Link>
                    ) : user.status === 'approved' || user.status === 'verified' ? (
                        <Link href={`/superAdmin/users/suspended/${user.id}`} className="text-white bg-red-500 px-2 py-1 rounded-full text-xs">
                            Suspend
                        </Link>
                    ) : user.status === 'suspended' ? (
                        <Link href={`/superAdmin/users/approved/${user.id}`} className="text-white bg-blue-500 px-2 py-1 rounded-full text-xs">
                            Reactivate
                        </Link>
                    ) : null
                } columns={columns} data={[user]} />
            <div className="p-6 shadow-md rounded-lg">
                <div className="mt-2 sm:mx-auto w-full">
                    <form className="space-y-6" onSubmit={Updateuser}>
                        <div className="flex flex-col md:flex-row md:gap-4">
                            <div className="w-full md:w-1/4 sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Update User Information
                                </h2>
                            </div>
                            {/* Name Field */}
                            <div className="w-full md:w-1/4">
                                <InputLabel htmlFor="name" value="Name" />
                                <div className="mt-2">
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="block w-full"
                                        autoComplete="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                            </div>

                            {/* Status Select Field */}
                            <div className="w-full md:w-1/4">
                                <InputLabel htmlFor="Status" value="Status" />
                                <div className="mt-2">
                                    <FormSelect
                                        defaultValue={statusOptions[0].value}
                                        options={statusOptions}
                                        value={data.status}
                                        onChange={(value) => setData('status', value)}
                                    />
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="w-full md:w-1/4 mt-11 flex justify-center items-center">
                                <SubmitButton type="submit" className="w-full " disabled={processing}>
                                    Update
                                </SubmitButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* If user role is 'restaurant', show relevant tables */}
            {
                userRole === "Restaurant" && (
                    <>
                        <div className="p-6 shadow-md rounded-lg">
                            <div className="mt-2 sm:mx-auto w-full">
                                <div className="w-full flex sm:mx-auto sm:w-full sm:max-w-sm">
                                    <h2 onClick={() => setShowRestaurantForm(prev => !prev)} className="mt-10 cursor-cell text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                                        Register New Restaurant
                                    </h2>
                                    <span
                                        className={`transform transition-transform ml-2   duration-300 ${ShowRestaurantForm ? "rotate-180 mt-13" : " mt-11"}`}
                                    >
                                        {ShowRestaurantForm ? "▲" : "▼"}
                                    </span>
                                </div>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${ShowRestaurantForm ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <form className="transition-all duration-300 space-y-6" onSubmit={CreateRestaurant}>

                                        <div className="md:flex md:gap-4">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="restoName" value="Restaurant Name" />
                                                <div className="mt-2">
                                                    <TextInput
                                                        id="restoName"
                                                        name="restoName"
                                                        value={data.restroName}
                                                        className="block w-full"
                                                        autoComplete="restoName"
                                                        onChange={(e) => setData('restroName', e.target.value)}
                                                        required
                                                    />
                                                    <InputError message={errors.restroName} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="restroEmail" value="Restaurant mail" />
                                                <div className="mt-2">
                                                    <TextInput
                                                        id="restroEmail"
                                                        name="restroEmail"
                                                        type='email'
                                                        value={data.restroEmail}
                                                        className="block w-full"
                                                        autoComplete="restoName"
                                                        onChange={(e) => setData('restroEmail', e.target.value)}
                                                        required
                                                    />
                                                    <InputError message={errors.restroEmail} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:flex md:gap-4">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="restroPhone" value="restroPhone" />
                                                <div className="mt-2">
                                                    <TextInput
                                                        id="restroPhone"
                                                        name="restroPhone"
                                                        value={data.restroPhone}
                                                        className="block w-full"
                                                        autoComplete="restroPhone"
                                                        onChange={(e) => setData('restroPhone', e.target.value)}
                                                        required
                                                    />
                                                    <InputError message={errors.restroPhone} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="restroaddress" value="Restaurant Address" />
                                                <div className="mt-2">
                                                    <TextInput
                                                        id="restroaddress"
                                                        name="restroaddress"
                                                        value={data.restroaddress}
                                                        className="block w-full"
                                                        autoComplete="restroaddress"
                                                        onChange={(e) => setData('restroaddress', e.target.value)}
                                                        required
                                                    />
                                                    <InputError message={errors.restroaddress} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:flex md:gap-4">
                                            <div className="md:w-1/2">
                                                <InputLocation
                                                    value={data.restrolocation}
                                                    setData={setData}
                                                    errors={{ location: errors.restrolocation }}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="restroDBA" value="Restaurant Doing Buisness as(DBA)" />
                                                <div className="mt-2">
                                                    <TextInput
                                                        id="restroDBA"
                                                        name="restroDBA"
                                                        value={data.restroDBA}
                                                        className="block w-full"
                                                        autoComplete="restroDBA"
                                                        onChange={(e) => setData('restroDBA', e.target.value)}
                                                        required
                                                    />
                                                    <InputError message={errors.restroDBA} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:flex md:gap-4">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="Status" value="Restaurant Cuisine Type" />
                                                <div className="mt-2">
                                                    <FormSelect
                                                        defaultValue={restroCuisineOptions[0].value}
                                                        options={restroCuisineOptions}
                                                        value={data.restrocuisine_type}
                                                        onChange={(value) => setData('restrocuisine_type', value)}
                                                    />
                                                    <InputError message={errors.restrocuisine_type} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="restrorestaurant_type" value="Restaurant Type" />
                                                <div className="mt-2">
                                                    <FormSelect
                                                        defaultValue={restrorestaurantOptions[0].value}
                                                        options={restrorestaurantOptions}
                                                        value={data.restrorestaurant_type}
                                                        onChange={(value) => setData('restrorestaurant_type', value)}
                                                    />
                                                    <InputError message={errors.restrorestaurant_type} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:flex md:gap-4">
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="restrolicense_no" value="Restaurant Liscience no" />
                                                <div className="mt-2">
                                                    <TextInput
                                                        id="restrolicense_no"
                                                        name="restrolicense_no"
                                                        value={data.restrolicense_no}
                                                        className="block w-full"
                                                        autoComplete="restrolicense_no"
                                                        onChange={(e) => setData('restrolicense_no', e.target.value)}
                                                        required
                                                    />
                                                    <InputError message={errors.restrolicense_no} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <InputLabel htmlFor="restraStatus" value="Restaurant status" />
                                                <div className="mt-2">
                                                    <FormSelect
                                                        defaultValue={restroStatusOptions[0].value}
                                                        options={restroStatusOptions}
                                                        value={data.restraStatus}
                                                        onChange={(value) => setData('restraStatus', value)}
                                                    />
                                                    <InputError message={errors.restraStatus} className="mt-2" />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="md:gap-4">
                                            <InputLabel htmlFor="restrologo" value="Upload Restaurant Logo" />

                                            <div
                                                className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
                                                onClick={() => document.getElementById("restrologo")?.click()} // ✅ Fixed
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    const file = e.dataTransfer.files[0];

                                                    if (file && ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/x-icon'].includes(file.type)) {
                                                        setData({ ...data, restrologo: file });
                                                    } else {
                                                        MySwal.fire({
                                                            toast: true,
                                                            title: 'Warning!',
                                                            text: "Only image files (.png, .jpg, .jpeg, .webp, .gif, .ico) are allowed.",
                                                            icon: 'warning',
                                                            position: 'top-end',
                                                            showConfirmButton: false
                                                        });
                                                    }
                                                }}
                                            >
                                                {data.restrologo ? (
                                                    <p className="text-green-500">{data.restrologo.name}</p>
                                                ) : (
                                                    <p className="text-gray-500">Drag & Drop your logo here or click to upload</p>
                                                )}

                                                {/* Hidden File Input */}
                                                <input
                                                    id="restrologo"
                                                    type="file"
                                                    name="restrologo"
                                                    accept=".png,.jpg,.jpeg,.webp,.gif,.ico"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file && ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/x-icon'].includes(file.type)) {
                                                            setData({ ...data, restrologo: file });
                                                        } else {
                                                            MySwal.fire({
                                                                toast: true,
                                                                title: 'Warning!',
                                                                text: "Only image files (.png, .jpg, .jpeg, .webp, .gif, .ico) are allowed.",
                                                                icon: 'warning',
                                                                position: 'top-end',
                                                                showConfirmButton: false
                                                            });
                                                        }
                                                    }}
                                                    required
                                                />
                                            </div>

                                            {/* ✅ Image Preview */}
                                            {data.restrologo && (
                                                <div className="mt-4 flex justify-center">
                                                    <img
                                                        src={URL.createObjectURL(data.restrologo)}
                                                        alt="Preview"
                                                        className="w-32 h-32 object-contain rounded-lg border"
                                                    />
                                                </div>
                                            )}

                                            {/* Error Message */}
                                            {errors.restrologo && (
                                                <p className="mt-2 text-red-500 text-sm">{errors.restrologo}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="w-full  mt-10 flex justify-center items-center">
                                            <SubmitButton type="submit" className="w-full " disabled={processing}>
                                                Register
                                            </SubmitButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* Restaurants List */}
                        {restaurants.length > 0 && (
                            <Table className="mt-4 " title={'Restaurants'} columns={restaurantColumns} data={restaurants} />
                        )}
                        {restaurants.length > 0 && (
                            <div className="p-6 shadow-md rounded-lg">
                                <div className="mt-2 sm:mx-auto w-full">
                                    <div className="w-full flex sm:mx-auto sm:w-full sm:max-w-sm">
                                        <h2 onClick={() => setShowTenantForm(prev => !prev)} className="mt-10 cursor-cell text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                                            Manage Client Restaurant
                                        </h2>
                                        <span
                                            className={`transform transition-transform ml-2   duration-300 ${ShowTenantForm ? "rotate-180 mt-13" : " mt-11"}`}
                                        >
                                            {ShowTenantForm ? "▲" : "▼"}
                                        </span>
                                    </div>
                                    <div
                                        className={`transition-all duration-300 overflow-hidden ${ShowTenantForm ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <h5>Register new domain</h5>
                                        <form className="transition-all duration-300 space-y-6" onSubmit={CreateTenant}>
                                            <div className="md:flex md:gap-4">
                                                <div className="md:w-1/2">
                                                    <InputLabel htmlFor="tenenrestroId" value="Select Restaurant" />
                                                    <div className="mt-2">
                                                        <select
                                                            id="restaurant_id"
                                                            className="w-full px-3 py-2 border rounded-tl-lg  bg-transparent dark:bg-blue-950  text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition"
                                                            value={data.tenenrestroId}
                                                            onChange={(e) => setData({ ...data, tenenrestroId: e.target.value })}
                                                            required
                                                        >
                                                            <option value="">Choose a Restaurant</option>
                                                            {restaurants.map((restaurant: any) => (
                                                                <option key={restaurant.id} value={restaurant.id}>
                                                                    {restaurant.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.tenenrestroId && <p className="mt-2 text-red-500 text-sm">{errors.tenenrestroId}</p>}
                                                    </div>
                                                </div>
                                                {/* Tenant Domain Input with Animated Icons */}
                                                <div className="md:w-1/2">
                                                    <InputLabel htmlFor="tenentDomain" value="Domain" />
                                                    <div className="relative mt-2">
                                                        <TextInput

                                                            id="tenentDomain"
                                                            name="tenentDomain"
                                                            value={data.tenentDomain}
                                                            className="block w-full"
                                                            autoComplete="tenentDomain"
                                                            onChange={(e) => setData({ ...data, tenentDomain: e.target.value.replace(/\s+/g, '') })}
                                                            required
                                                        />
                                                        {/* Animated Validation Icons */}
                                                        <div className="absolute inset-y-0 right-3 flex items-center transition-all duration-300">
                                                            {loading ? (
                                                                <span className="animate-spin text-gray-400"><FontAwesomeIcon icon={faSpinner} className="text-yellow-500" size="lg" /></span> // Loading spinner
                                                            ) : isValid === true ? (
                                                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" size="lg" />
                                                            ) : isValid === false ? (
                                                                <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" size="lg" />
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <InputError message={errors.tenentDomain} className="mt-2" />
                                                </div>
                                                {/* Submit Button */}
                                                <div className="w-full  mt-10 flex justify-center items-center">
                                                    <SubmitButton type="submit" className="w-full " disabled={processing}>
                                                        Register
                                                    </SubmitButton>
                                                </div>

                                            </div>
                                        </form>
                                        <h5>Upload Document</h5>
                                        <form className="transition-all duration-300 space-y-6" onSubmit={UploadDocument}>
                                            {/* Restaurant Selection */}
                                            <div className="md:flex md:gap-4">
                                                <div className="md:w-1/2">
                                                    <InputLabel htmlFor="kycrestroId" value="Select Restaurant" />
                                                    <div className="mt-2">
                                                        <select
                                                            id="kycrestroId"
                                                            className="w-full px-3 py-2 border rounded-tl-lg  bg-transparent dark:bg-blue-950  text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition"
                                                            value={data.kycrestroId}
                                                            onChange={(e) => setData({ ...data, kycrestroId: e.target.value })}
                                                            required
                                                        >
                                                            <option value="">Choose a Restaurant</option>
                                                            {restaurants.map((restaurant: any) => (
                                                                <option key={restaurant.id} value={restaurant.id}>
                                                                    {restaurant.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.kycrestroId && <p className="mt-2 text-red-500 text-sm">{errors.kycrestroId}</p>}
                                                    </div>
                                                </div>

                                                {/* KYC Document Type Selection */}
                                                <div className="md:w-1/2">
                                                    <InputLabel htmlFor="kyc_type" value="Select KYC Document Type" />

                                                    <div className="mt-2">
                                                        <select
                                                            id="kyc_type"
                                                            className="w-full px-3 py-2 border rounded-tl-lg  bg-transparent dark:bg-blue-950  text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition"
                                                            value={data.kycDocumentType}
                                                            onChange={(e) => setData({ ...data, kycDocumentType: e.target.value })}
                                                            required
                                                        >
                                                            <option value="">Choose a Document Type</option>
                                                            {kycDocumentTypesOptions?.map((doc) => (
                                                                <option key={doc.value} value={doc.value}>
                                                                    {doc.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.kycDocumentType && <p className="mt-2 text-red-500 text-sm">{errors.kycDocumentType}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Document Upload Drop Area */}
                                            <div className="mt-6">
                                                <InputLabel htmlFor="kyc_document" value="Upload KYC Document" />
                                                <div
                                                    className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
                                                    onClick={() => document.getElementById("kycDocuments")?.click()} // ✅ Click triggers file input
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        const file = e.dataTransfer.files[0];


                                                        if (file && ['application/pdf', 'application/msword',
                                                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                            'text/plain'].includes(file.type)) {
                                                            setData({ ...data, kycDocuments: file });
                                                        } else {
                                                            MySwal.fire({
                                                                toast: true,
                                                                title: 'Warning!',
                                                                text: "Only document files (.pdf, .doc, .docx, .txt) are allowed.",
                                                                icon: 'warning',
                                                                position: 'top-end',
                                                                showConfirmButton: false
                                                            });
                                                        }
                                                    }}
                                                >
                                                    {data.kycDocuments ? (
                                                        <p className="text-green-500">{data.kycDocuments.name}</p>
                                                    ) : (
                                                        <p className="text-gray-500">Drag & Drop your document here or click to upload</p>
                                                    )}

                                                    {/* Hidden File Input Inside the Div */}
                                                    <input
                                                        id="kycDocuments"
                                                        type="file"
                                                        name="kycDocuments"
                                                        accept=".pdf,.doc,.docx,.txt"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];

                                                            // Ensure file exists and validate type manually (optional but recommended)
                                                            if (file && ['application/pdf', 'application/msword',
                                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                                'text/plain'].includes(file.type)) {
                                                                setData({ ...data, kycDocuments: file });
                                                            } else {
                                                                alert("Only document files (.pdf, .doc, .docx, .txt) are allowed.");
                                                            }
                                                        }}
                                                        required
                                                    />

                                                </div>

                                                {errors.kycDocuments && <p className="mt-2 text-red-500 text-sm">{errors.kycDocuments}</p>}
                                            </div>

                                            {/* Submit Button */}
                                            <div className="w-full mt-6 flex justify-center">
                                                {progress && (
                                                    <progress value={progress.percentage} max="100">
                                                        {progress.percentage}%
                                                    </progress>
                                                )}
                                                <SubmitButton type="submit" className="w-full" disabled={processing}>
                                                    Upload KYC Document
                                                </SubmitButton>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        )
                        }
                        {/* Tenants List */}
                        {
                            tenants.length > 0 && (

                                <Table className="mt-4" title={'Tenants'} columns={tenantColumns} data={tenants} />
                            )
                        }

                        {/* KYC Documents */}
                        {
                            kycDocuments.length > 0 && (
                                <Table className="mt-4" title={'KYC Documents'} columns={kycColumns} data={kycDocuments} />
                            )
                        }
                    </>
                )
            }
        </SuperAdminLayout >

    );
}

export default Show;
