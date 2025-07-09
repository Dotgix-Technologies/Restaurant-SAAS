import React, { FormEventHandler, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { KycDocument, kycDocumentTypesOptions } from "@/types/kyc_documents";

interface Props {
    restaurantType: keyof typeof kycDocumentTypesOptions; // 'OnSite' | 'CloudKitchen' | 'Hybrid'
    existingDocuments: KycDocument[];
    restaurantId: number;
}

const KycUpdateForm: React.FC<Props> = ({ restaurantType, existingDocuments, restaurantId }) => {
    const kycOptions = kycDocumentTypesOptions[restaurantType] || [];

    const getInitialData = () => ({
        kyc_documents: kycOptions.map((option) => {
            const existingDoc = existingDocuments.find((doc) => doc.type === option.value);
            return {
                type: option.value,
                existing_path: existingDoc?.document_path || "",
                status: existingDoc?.status || "",
                document: null as File | null,
            };
        }),
    });

    const { data, setData, post, processing, reset, errors, progress } = useForm(getInitialData());
    useEffect(() => {
        setData(getInitialData());
    }, [restaurantType, existingDocuments]);
    const handleFileChange = (index: number, file: File | null) => {
        setData((prevData) => ({
            ...prevData,
            kyc_documents: prevData.kyc_documents.map((doc, i) =>
                i === index ? { ...doc, document: file } : doc
            ),
        }));
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        data.kyc_documents.forEach((doc, index) => {
            formData.append(`kyc_documents[${index}][type]`, doc.type);
            if (doc.document) {
                formData.append(`kyc_documents[${index}][document]`, doc.document);
            }
        });

        post(route("Restaurant.kyc.update", restaurantId), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: (page) => {
                reset()
                console.log("KYC Documents updated successfully!", data);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <h3 className="text-lg font-semibold">KYC Documents</h3>

            {data.kyc_documents.map((doc, index) => {
                const option = kycOptions.find((opt) => opt.value === doc.type);
                return (
                    <div key={doc.type} className={`p-4 border rounded dark:border-gray-700 ${doc.existing_path && doc.status === 'pending_approval'
                        ? 'bg-yellow-600'
                        : doc.status === 'Rejected'
                            ? 'bg-red-600' : doc.status === 'Approved' ? 'bg-green-600'
                                : 'bg-blue-600'
                        }`}>
                        {/* Type */}
                        <div className="mb-2">
                            <div className="flex flex-row justify-between"><label className="block font-semibold mb-1">Document Type</label>
                                {doc.existing_path ? (
                                    <>
                                        {doc.status === 'Rejected' && (
                                            <small className="text-gray-50">
                                                This document was rejected. Please upload a valid document again.
                                            </small>
                                        )}
                                        <span
                                            className={`max-w-fit m-2 rounded-full p-1 text-xs ${doc.status === 'pending_approval'
                                                ? 'bg-yellow-900'
                                                : doc.status === 'Rejected'
                                                    ? 'bg-red-900'
                                                    : 'bg-green-900'
                                                } text-white`}
                                        >
                                            {doc.status ? doc.status.replace('_', ' ').toUpperCase() : 'fuck you'}
                                        </span>
                                    </>
                                ) : <span
                                    className={`max-w-fit m-2 rounded-full bg-gray-900 p-1 text-xs text-white`}
                                >
                                    {'Please Upload Document'}
                                </span>}
                            </div>

                            <select
                                value={doc.type}
                                disabled
                                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-500"
                            >
                                <option value={doc.type}>{option?.label}</option>
                            </select>
                        </div>

                        {/* Existing File */}
                        <div className="mb-2">
                            <label className="block font-semibold mb-1">Existing Document</label>
                            {doc.existing_path ? (
                                <a
                                    href={`/${doc.existing_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline"
                                >
                                    View Current Document
                                </a>
                            ) : (
                                <p className="text-sm text-gray-400">No document uploaded yet.</p>
                            )}
                        </div>

                        {/* Upload Field */}
                        <div>
                            <label className="block font-semibold mb-1">Upload New File (Optional)</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                            {errors[`kyc_documents.${index}.document`] && (
                                <div className="text-red-500 text-sm">{errors[`kyc_documents.${index}.document`]}</div>
                            )}
                        </div>
                    </div>
                );
            })}

            <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                {processing ? "Uploading..." : "Update KYC Documents"}
            </button>

            {progress && (
                <div className="mt-2">
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                </div>
            )}
        </form>
    );
};

export default KycUpdateForm;
