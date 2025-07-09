import React, { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";

interface Props {
    restaurantId: number;
}

const CreateTenant: React.FC<Props> = ({ restaurantId }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        domain: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("Restaurant.tenant.create", restaurantId), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                console.log("Tenant created successfully!");
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Register New Tenant Domain</h3>

            {/* Domain Input */}
            <div>
                <label className="block font-semibold mb-1">Domain Name</label>
                <input
                    type="text"
                    name="domain"
                    value={data.domain}
                    onChange={(e) => setData("domain", e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Enter domain (example: myrestaurant)"
                />
                {errors.domain && (
                    <p className="text-sm text-red-600 mt-1">{errors.domain}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                {processing ? "Creating..." : "Create Tenant"}
            </button>
        </form>
    );
};

export default CreateTenant;
