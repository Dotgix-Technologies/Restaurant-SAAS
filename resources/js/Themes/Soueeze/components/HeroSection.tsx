import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight
} from "lucide-react"
import heroData from "../data.json"
import { HeroSectionConfig } from "../datatype"

const heroSection = heroData.heroSection as HeroSectionConfig

const iconMap = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram
}

export default function HeroSection() {
  return (
    <section className="bg-gray-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-teal-500 italic">
                {heroSection.tagline}
              </h2>
              <h1 className="text-6xl font-black text-gray-900 leading-tight whitespace-pre-line">
                {heroSection.title}
              </h1>
              <p className="text-gray-600 text-lg max-w-md">
                {heroSection.subtext}
              </p>
            </div>

            {/* Order Button */}
            <div className="flex items-center space-x-6">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wide flex items-center group">
                {heroSection.orderButton.label}
                <span className="ml-2 text-2xl font-bold">
                  {heroSection.orderButton.highlight}
                </span>
                <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {heroSection.socials.map((social, index) => {
                const Icon = iconMap[social.platform]
                return (
                  <button
                    key={index}
                    className="w-10 h-10 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full flex justify-center items-center">
            <img
              src={heroSection.image.src}
              alt={heroSection.image.alt}
              className="max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
