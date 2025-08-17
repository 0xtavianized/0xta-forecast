"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-wide">
          0xta <span className="text-blue-300">Forecast</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white">
          <a href="/" className="hover:text-gray-400 transition-colors">
            Home
          </a>
          <a href="/about" className="hover:text-gray-400 transition-colors">
            About
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 flex flex-col space-y-4 p-4">
          <Link
            href="/"
            className="hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
