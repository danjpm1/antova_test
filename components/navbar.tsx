"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Facebook, Instagram, Menu, X } from "lucide-react"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
]

const socialLinks = [
  { href: "https://www.facebook.com/anovabuilders", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/anovabuilders", icon: Instagram, label: "Instagram" },
  { href: "https://x.com/anovabuilders", icon: X, label: "X" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black h-16">
      <div className="w-full px-8 lg:px-12 xl:px-20 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src="/antova-logo-gold.svg" alt="Antova Builders" className="h-10 w-auto" />
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-white">Antova</span>
            <span className="text-[#C6912C]"> Builders</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[15px] font-semibold transition-colors relative ${
                pathname === href ? "text-white" : "text-white hover:text-[#F5A623]"
              }`}
            >
              {label}
              {pathname === href && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F5A623]" />}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#F5A623] transition-colors"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`md:hidden bg-black border-t border-[#F5A623]/10 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 py-6 space-y-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-white text-sm font-semibold hover:text-[#F5A623] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="flex items-center gap-4 pt-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#F5A623] transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
