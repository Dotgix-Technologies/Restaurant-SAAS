import { Facebook, Twitter, Linkedin } from 'lucide-react'
import { FooterSection } from '../datatype'
import data from '../data.json'

export default function Footer() {
  const footerData: FooterSection = data.footer

  const iconMap = {
    Facebook,
    Twitter,
    LinkedIn: Linkedin,
  }

  return (
    <div className="w-full bg-white text-center">
      <div className="border-t border-gray-200 py-6 px-6 pb-4">
        {/* Social Icons */}
        <div className="flex justify-center items-center gap-4 flex-wrap pb-4">
          {footerData.socialIcons.map((item, idx) => {
            const Icon = iconMap[item.alt as keyof typeof iconMap]
            return (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.alt}
              >
                <Icon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
              </a>
            )
          })}
        </div>

        {/* Footer Links */}
        <div className="text-sm text-gray-600 flex gap-4 justify-center pb-4 flex-wrap">
          {footerData.footerLinks.map((link, idx) => (
            <a key={idx} href={link.href}>
              {link.label}
              {idx !== footerData.footerLinks.length - 1 && <span> | </span>}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-600 font-medium">
          {footerData.copyright}
        </p>
      </div>
    </div>
  )
}
