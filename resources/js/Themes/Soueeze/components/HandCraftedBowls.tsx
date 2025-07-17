import bowlData from '../data.json'
import { HandCraftedBowlsConfig } from '../datatype'

const handCraftedBowls = bowlData.handCraftedBowls as HandCraftedBowlsConfig

export default function HandCraftedBowls() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left - Bowl Image */}
        <div className="flex justify-center">
          <img
            src={handCraftedBowls.image.src}
            alt={handCraftedBowls.image.alt}
            className="max-w-lg w-full object-contain"
          />
        </div>

        {/* Right - Text Content */}
        <div className="text-center lg:text-left">
          <h4 className="text-teal-500 italic text-2xl font-semibold pb-3">
            {handCraftedBowls.tagline}
          </h4>
          <h2 className="text-5xl font-black text-gray-900 uppercase mb-4 whitespace-pre-line">
            {handCraftedBowls.title}
          </h2>
          <p className="text-gray-600 text-lg mb-1">
            {handCraftedBowls.description}
          </p>
          <p className="text-gray-500 text-sm italic mb-6">
            {handCraftedBowls.pronunciation}
          </p>

          {/* CTA */}
          <a
            href={handCraftedBowls.cta.href}
            className="text-teal-600 font-bold uppercase text-sm border-b-2 border-teal-500 hover:text-teal-800 transition"
          >
            {handCraftedBowls.cta.label}
          </a>
        </div>
      </div>
    </section>
  )
}
