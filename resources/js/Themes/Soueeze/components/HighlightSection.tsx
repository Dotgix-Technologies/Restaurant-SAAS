'use client'
import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import highlightData from '../data.json'
import { HighlightSectionConfig } from '../datatype'

const highlightSection = highlightData.highlightSection as HighlightSectionConfig

export default function HighlightSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <section className="bg-white py-10 text-center relative">
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <h4 className="text-teal-500 italic text-2xl font-semibold pb-3">
          {highlightSection.tagline}
        </h4>
        <h2 className="text-5xl font-black text-gray-900 uppercase mb-4">
          {highlightSection.title}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          {highlightSection.description}
        </p>

        <div className="mb-12">
          <a
            href={highlightSection.button.href}
            className="text-teal-600 font-bold uppercase text-sm border-b-2 border-teal-500 hover:text-teal-800 transition"
          >
            {highlightSection.button.label}
          </a>
        </div>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 30 }
        }}
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: prevRef.current!,
          nextEl: nextRef.current!
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

        className="w-full px-4 pb-12"
        style={{
          backgroundImage: `url('${highlightSection.backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {highlightSection.juices.map((juice, index) => (
          <SwiperSlide key={index} className="text-center transition-transform duration-300">
            <div
              className={`flex flex-col items-center transition-transform duration-300 ${index === activeIndex
                ? 'scale-100 z-10'
                : 'scale-80 opacity-90'
                }`}
            >
              <img
                src={juice.image}
                alt={juice.name}
                className="h-auto object-contain mx-auto pb-6"
              />
              <p className="text-black font-semibold text-xl">{juice.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="flex items-center justify-center w-full gap-4 p-4">
        <button
          ref={prevRef}
          className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 transition duration-300 border border-slate-700 rounded-full bg-white hover:scale-105 hover:border-slate-900 focus-visible:outline-none"
          aria-label="Previous Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-black"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 transition duration-300 border border-slate-700 rounded-full bg-white hover:scale-105 hover:border-slate-900 focus-visible:outline-none"
          aria-label="Next Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-black"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  )
}
