import FormSelect from '@/Components/SuperAdmin/FormSelect';
import InputError from '@/Components/SuperAdmin/InputError';
import InputLabel from '@/Components/SuperAdmin/InputLabel';
import SubmitButton from '@/Components/SuperAdmin/SubmitButton';
import TextInput from '@/Components/SuperAdmin/TextInput';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, { FormEventHandler, useState } from 'react';
import TextAreaInput from '@/Components/SuperAdmin/TextAreaInput';
const MySwal = withReactContent(Swal)
const Create: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: '',
        data: '',
        dataStructure: '',
        status: 'active',
        description: '',
        file: null as File | null,
    });

    const categoryOptions = [
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

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "Under Maintainance", label: "Under Maintenance" },
        { value: "inactive", label: "Inactive" }
    ];

    const { flash } = usePage().props as { flash?: { success?: string, error?: String } };
    const submit: FormEventHandler = (e) => {
        console.log('Form submitted', data);
        try {
            post(route('SuperAdmin.users.store'), {
                onFinish: () => reset('name'),
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
            MySwal.fire({
                toast: true,
                title: flash?.error || 'Error!',
                text: 'Error While adding product',
                icon: 'error',
                position: 'top-end',
                showConfirmButton: false,
            });
        }
    };
    return (
        <SuperAdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Upload New Theme
                </h2>
            }>
            <Head title="Dashboard" />

            <div className="p-6 shadow-md rounded-lg">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Let's Build a New Theme
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={submit}>
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <div className="mt-2">
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                            </div>
                            {/* Category Select */}
                            <div>
                                <InputLabel htmlFor="category" value="Category" />
                                <div className="mt-2">
                                    <FormSelect
                                        defaultValue={categoryOptions[0].value}
                                        options={categoryOptions}
                                        value={data.category}
                                        onChange={(value) => setData('category', value)}
                                    />
                                    <InputError message={errors.category} className="mt-2" />
                                </div>
                            </div>
                            {/* Data Input */}
                            <div>
                                <InputLabel htmlFor="data" value="Data" />
                                <div className="mt-2">
                                    <TextAreaInput
                                        id="data"
                                        name="data"
                                        value={data.data}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('data', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.data} className="mt-2" />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="data" value="Data Structure" />
                                <div className="mt-2">
                                    <TextAreaInput
                                        id="dataStructure"
                                        name="dataStructure"
                                        value={data.dataStructure}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('dataStructure', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.dataStructure} className="mt-2" />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <div className="mt-2">
                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
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
                                            setData({ ...data, file: file });
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
                                    {data.file ? (
                                        <p className="text-green-500">{data.file.name}</p>
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
                                                setData({ ...data, file: file });
                                            } else {
                                                alert("Only document files (.pdf, .doc, .docx, .txt) are allowed.");
                                            }
                                        }}
                                        required
                                    />

                                </div>

                                {errors.file && <p className="mt-2 text-red-500 text-sm">{errors.file}</p>}
                            </div>
                            {/* Submit Button */}
                            <div>
                                <SubmitButton type="submit" className="w-full" disabled={processing}>
                                    Register
                                </SubmitButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default Create;
