import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import navbarData from "../data.json";
import { NavbarConfig } from "../datatype";

const navbar = navbarData.navbar as NavbarConfig;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mobileMenuRef.current;
    if (el) {
      if (isOpen) {
        el.style.display = "block";
        requestAnimationFrame(() => {
          el.style.maxHeight = el.scrollHeight + "px";
        });
      } else {
        el.style.maxHeight = "0px";
        setTimeout(() => {
          if (el) el.style.display = "none"; // hide after animation
        }, 500); // matches duration-500
      }
    }
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              <img
                src={navbar.logo.src}
                alt={navbar.logo.alt}
                width={navbar.logo.width}
              />
            </Link>
          </div>

          {/* Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navbar.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium uppercase tracking-wide flex items-center">
              <User className="w-4 h-4 mr-2" />
              {navbar.loginButton.label}
            </button>
            {navbar.cartIcon && (
              <button className="text-gray-700 hover:text-gray-900">
                <ShoppingCart className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu - Hidden by Default, Smooth Show */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden transition-all duration-500 ease-in-out max-h-0 bg-white px-4 py-4 mt-2 rounded-md border border-gray-200 shadow-lg"
          style={{ display: "none" }} // Hidden by default
        >
          <div className="flex flex-col space-y-2">
            {navbar.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-800 hover:bg-gray-100 rounded px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200 flex flex-col space-y-2">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium uppercase tracking-wide flex items-center justify-center transition-all">
                <User className="w-4 h-4 mr-2" />
                {navbar.loginButton.label}
              </button>
              {navbar.cartIcon && (
                <button className="text-gray-700 hover:text-gray-900 flex items-center justify-center py-2">
                  <ShoppingCart className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
