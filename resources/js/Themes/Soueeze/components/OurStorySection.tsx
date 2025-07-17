import storyData from "../data.json"
import { OurStorySectionConfig } from "../datatype"

const story = storyData.ourStorySection as OurStorySectionConfig

export default function OurStorySection() {
  return (
    <section className="pt-14 sm:pt-20 pb-20 sm:pb-28"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/realistic-frost-texture-backgroung_23-2149221853.jpg?semt=ais_hybrid&w=740')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">

        {/* Left Side - Overlapping Images */}
        <div className="relative w-full flex justify-center">
          {/* Background Image */}
          <div className="w-[280px] sm:w-[320px] md:w-[350px] h-[240px] sm:h-[280px] md:h-[300px] rounded-xl overflow-hidden shadow-lg">
            <img
              src={story.images.background.src}
              alt={story.images.background.alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Foreground Image */}
          <div className="absolute -bottom-6 sm:-bottom-20 -right-0 sm:-right-6 w-[170px] sm:w-[260px] md:w-[300px] h-[180px] sm:h-[220px] md:h-[250px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={story.images.foreground.src}
              alt={story.images.foreground.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Text */}
        <div className="space-y-5 sm:space-y-6 text-center lg:text-left">
          <h3 className="text-teal-500 italic text-xl sm:text-2xl font-semibold">{story.sectionTag}</h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 uppercase">
            {story.sectionTitle}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            {story.description}
          </p>
          <a
            href={story.readMoreLink.href}
            className="text-teal-600 font-bold uppercase text-sm border-b-2 border-teal-500 w-max hover:text-teal-800 transition mx-auto lg:mx-0 block"
          >
            {story.readMoreLink.label}
          </a>
        </div>
      </div>
    </section>
  )
}
