import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="Rectitude Events" 
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className={`font-display font-semibold text-lg leading-none transition-colors duration-300 ${scrolled || location.pathname !== '/' ? 'text-brown' : 'text-cream'}`}>Rectitude</div>
            <div className={`font-body text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${scrolled || location.pathname !== '/' ? 'text-gold' : 'text-gold/90'}`}>Events</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link font-body text-sm font-medium tracking-wide transition-colors duration-200 ${
                location.pathname === to 
                  ? 'text-plum active' 
                  : (scrolled || location.pathname !== '/' ? 'text-brown hover:text-plum' : 'text-cream/90 hover:text-white')
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-brown text-cream px-5 py-2 rounded-sm font-body text-sm font-medium tracking-wide hover:bg-plum transition-colors duration-300 shadow-sm"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brown"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-md border-t border-brown/10 px-6 py-6 flex flex-col gap-5">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`font-body text-base font-medium ${
                location.pathname === to ? 'text-plum' : 'text-brown'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="bg-brown text-cream text-center px-5 py-3 rounded-sm font-body text-sm font-medium"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}
