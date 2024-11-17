"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-secondary text-primary p-4">
      <nav className="container mx-auto flex justify-start items-center space-x-4">
        {/* Clarify Button */}
        <Link href="/" passHref>
          <button className="text-xl font-semibold px-4 py-2 rounded transition-colors duration-200 hover:bg-accent hover:text-white">
            Clarify
          </button>
        </Link>

        {/* Hamburger Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu" // Accessibility label
            className="p-2 rounded transition-colors duration-200 hover:bg-accent hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute left-0 mt-2 bg-secondary border border-gray-300 rounded shadow-lg">
              <Link href="/demo" passHref>
                <button
                  onClick={() => setMenuOpen(false)} // Close menu on click
                  className="block w-full text-left px-4 py-2 hover:bg-accent hover:text-white"
                >
                  Demo
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
