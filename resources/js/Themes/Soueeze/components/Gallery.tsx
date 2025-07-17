import { Facebook, Twitter, Linkedin, Phone } from 'lucide-react'
import { GallerySection } from '../datatype'
import data from '../data.json'

export default function Gallery() {
    const galleryData: GallerySection = data.gallery

    const iconMap = {
        Facebook,
        Twitter,
        LinkedIn: Linkedin,
    }

    return (
        <section className="w-full bg-white text-center">
            {/* Instagram Logo */}
            <div className="flex justify-center items-center flex-col space-y-2 pb-6">
                <img
                    src={galleryData.instagramLogo}
                    alt="Instagram Icon"
                    className="w-50 h-auto"
                />
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-center items-center max-w-7xl mx-auto mb-4 px-4">
                {galleryData.galleryImages.map((img, idx) => (
                    <div
                        key={idx}
                        className="overflow-hidden rounded-lg shadow hover:scale-105 transition duration-300"
                    >
                        <img
                            src={img}
                            alt={`Gallery Image ${idx + 1}`}
                            className="w-full h-56 object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Footer Row */}
            <div className="flex flex-col md:flex-row items-center justify-around px-6 py-4">
                {/* Logo */}
                <div className="flex justify-center items-center gap-6 flex-wrap">
                    <img
                        src={galleryData.footerLogo}
                        alt="Main Squeeze"
                        className="w-28 h-auto"
                    />
                </div>

                {/* Footer Links */}
                <div className="flex justify-center flex-wrap gap-4 text-xs md:text-sm font-semibold text-gray-700 uppercase">
                    {galleryData.footerLinks.map((link, idx) => (
                        <span key={idx}>
                            {idx > 0 && <span>|</span>} {link}
                        </span>
                    ))}
                </div>

                {/* Phone Number */}
                <div className="flex items-center space-x-2 text-[#12a296] font-bold text-md md:text-lg mt-4 md:mt-0">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{galleryData.contactPhone}</span>
                </div>
            </div>
        </section>
    )
}
