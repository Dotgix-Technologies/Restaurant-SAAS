'use client'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

import itemsData from '../data.json'
import { ItemsSectionConfig } from '../datatype'

const itemsSection = itemsData.itemsSection as ItemsSectionConfig

export default function ItemsSection() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <section
      className="bg-white py-20 text-center relative"
      style={{
        backgroundImage: `url('${itemsSection.backgroundImage}')`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Heading */}
        <h4 className="text-teal-500 italic text-2xl font-semibold pb-3">
          {itemsSection.tagline}
        </h4>
        <h2 className="text-5xl font-black text-gray-900 uppercase mb-4">
          {itemsSection.title}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          {itemsSection.description}
        </p>

        {/* Slider */}
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation === 'object'
            ) {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }
          }}
          modules={[Navigation, Autoplay]}
          className="pb-24"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {itemsSection.items.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center space-y-4 group transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="relative w-full flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[300px] object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
                <h4 className="text-black font-bold text-md uppercase">
                  {item.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center w-full gap-2 mt-6">
          <button
            ref={prevRef}
            className="inline-flex items-center justify-center w-10 h-10 transition duration-300 border rounded-full lg:w-12 lg:h-12 text-black border-slate-700 hover:scale-105 hover:border-slate-900 focus-visible:outline-none bg-white"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            ref={nextRef}
            className="inline-flex items-center justify-center w-10 h-10 transition duration-300 border rounded-full lg:w-12 lg:h-12 text-black border-slate-700 hover:scale-105 hover:border-slate-900 focus-visible:outline-none bg-white"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
