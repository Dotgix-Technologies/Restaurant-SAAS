import { Gallery as GalleryType } from "@/types/gallery";
import { faEye, faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

interface GalleryProps {
    setGalleryModal: (value: boolean) => void;
    galleryModal: boolean;
    className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ galleryModal, setGalleryModal, className }) => {
    const [gallery, setGallery] = useState<GalleryType[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { data, setData, post, reset, processing } = useForm<{ images: File[] }>({
        images: [],
    });
    const loadMoreGallery = async () => {
        if (!nextPageUrl) return;

        setLoadingMore(true);
        try {
            const response = await axios.get(nextPageUrl);
            setGallery((prev) => [...prev, ...response.data.data]);
            setNextPageUrl(response.data.next_page_url);
        } catch (error) {
            console.error('Error loading more gallery:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Fetch gallery when modal opens
    useEffect(() => {
        if (galleryModal) {
            const fetchGallery = async () => {
                setLoading(true);
                try {
                    console.log("fetching data");

                    const response = await axios.get(route('restaurant.getGallery'));
                    setGallery(response.data.data); // Laravel resource pagination uses `data`
                    setNextPageUrl(response.data.next_page_url);
                } catch (error) {
                    console.error('Error fetching gallery:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchGallery();
        }
    }, [galleryModal]);

    // Handle file selection and generate previews
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setData('images', files);

        const filePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    // Form submit
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.images || data.images.length === 0) return;

        post(route('Restaurant.uploadGalleryImage'), {
            forceFormData: true,   // This tells Inertia to convert files in `data` to FormData
            onSuccess: async () => {
                try {
                    const response = await axios.get(route('restaurant.getGallery'));
                    setGallery(response.data.data);
                } catch (error) {
                    console.error('Error refreshing gallery:', error);
                }
                reset();
                setPreviews([]);
            },
        });
    };

    const viewImage = (item: GalleryType) => {
        const imageUrl = `/${item.url}`;
        const imageWindow = window.open(imageUrl, '_blank');
        if (imageWindow) {
            imageWindow.focus();
        } else {
            console.error('Failed to open image in new tab');
        }
    }

    const archiveImage = async (item: GalleryType) => {
        try {
            await axios.get(route('Restaurant.gallery.archive', item.id));

            setGallery((prev) => prev.filter((img) => img.id !== item.id));

            Swal.fire({
                icon: 'success',
                title: 'Archived!',
                text: 'Image has been archived successfully.',
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Error archiving image:', error);
            Swal.fire({
                icon: 'error',
                title: 'Archive Failed',
                text: 'There was an error archiving the image.',
            });
        }
    };

    const deleteImage = async (item: GalleryType) => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the image.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmed.isConfirmed) {
            try {
                await axios.get(route('Restaurant.gallery.delete', item.id));

                setGallery((prev) => prev.filter((img) => img.id !== item.id));

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Image has been deleted successfully.',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error('Error deleting image:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Delete Failed',
                    text: 'There was an error deleting the image.',
                });
            }
        }
    };

    if (!galleryModal) return null;
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ${className}`}>
            <div className="relative bg- dark:bg-gray-800 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4">

                {/* Close Button */}
                <button
                    onClick={() => setGalleryModal(false)}
                    className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl font-bold"
                >
                    ×
                </button>

                <h2 className="text-xl font-semibold mb-4">Media Gallery</h2>

                {/* Upload Form */}
                <form onSubmit={submit} className="mb-6">
                    <label className="block mb-1 font-medium">Upload Images:</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="mb-2"
                    />

                    {previews.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {previews.map((src, idx) => (
                                <div key={idx} className="relative">
                                    {/* Image Preview */}
                                    <img
                                        src={src}
                                        alt={`Preview ${idx}`}
                                        className="h-24 w-24 object-cover rounded"
                                    />

                                    {/* X Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // Remove selected preview and file
                                            setPreviews((prev) => prev.filter((_, i) => i !== idx));
                                            setData("images", data.images.filter((_, i) => i !== idx));
                                        }}
                                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}


                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {processing ? "Uploading..." : "Upload Images"}
                    </button>
                </form>
                {/* Gallery Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-12 h-12 border-4 border-gray-500 dark:border-gray-50 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {gallery.length > 0 ? (
                            <div className="overflow-hidden grid grid-cols-2 md:grid-cols-3 gap-4">
                                {gallery.map((item) => (
                                    <div key={item.id} className="relative overflow-hidden border rounded-md p-2 text-center" title={item.name}>
                                        <div className="absolute  left-0 top-0 right-0 flex justify-end m-1">
                                            <FontAwesomeIcon icon={faEye} size="lg" className="text-yellow-400 cursor-alias p-1 rotate-0" onClick={() => viewImage(item)} />
                                            <FontAwesomeIcon icon={faArchive} size="lg" className="text-gray-400 cursor-pointer  p-1 rotate-0" onClick={() => archiveImage(item)} />
                                            <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-600 cursor-pointer p-1 rotate-0" onClick={() => deleteImage(item)} />
                                        </div>
                                        <img
                                            src={`/${item.url}`}
                                            alt={item.alt || "Gallery Image"}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                        <p className="mt-1 text-sm">{item.name}</p>
                                    </div>
                                ))}
                                {nextPageUrl && (
                                    <div className="text-center mt-4">
                                        <button
                                            onClick={loadMoreGallery}
                                            disabled={loadingMore}
                                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                        >
                                            {loadingMore ? "Loading..." : "Load More"}
                                        </button>
                                    </div>
                                )}

                            </div>
                        ) : (
                            <p className="text-gray-500">No gallery items found.</p>
                        )
                        }
                    </>
                )}

            </div>
        </div>
    );
};

export default Gallery;
