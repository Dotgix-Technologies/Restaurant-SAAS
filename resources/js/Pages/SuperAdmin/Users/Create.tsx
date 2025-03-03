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
const MySwal = withReactContent(Swal)
const Create: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const roleOptions = [
        { value: "SuperAdmin", label: "SuperAdmin" },
        { value: "Restaurants", label: "Restaurants Owner" },
        { value: "Clients", label: "Clients" },
        { value: "SuperConsultants", label: "SuperConsultants" }
    ];

    const { flash } = usePage().props as { flash?: { success?: string, error?: String } };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('Form submitted', data);
        try {
            post(route('SuperAdmin.users.store'), {
                onFinish: () => reset('name', 'email', 'role', 'password', 'password_confirmation'),

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
                    Create New Users
                </h2>
            }>
            <Head title="Dashboard" />

            <div className="p-6 shadow-md rounded-lg">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Let's Register a New User
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

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <div className="mt-2">
                                    <TextInput
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            </div>

                            {/* Role Select */}
                            <div>
                                <InputLabel htmlFor="role" value="Role" />
                                <div className="mt-2">
                                    <FormSelect
                                        options={roleOptions}
                                        value={data.role}
                                        onChange={(value) => setData('role', value)}
                                    />
                                    <InputError message={errors.role} className="mt-2" />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <div className="mt-2">
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                <div className="mt-2">
                                    <TextInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
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
