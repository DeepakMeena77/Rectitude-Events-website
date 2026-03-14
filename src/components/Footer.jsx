import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-cream/80">
      {/* Top divider */}
      <div className="section-divider opacity-30" />

      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="font-display text-2xl font-semibold text-cream mb-1">Rectitude Events</div>
          <div className="text-xs tracking-[0.2em] text-gold uppercase mb-4">An Attitude to Make People Tension Free</div>
          <p className="text-sm text-cream/60 leading-relaxed">
            Your trusted event management partner delivering flawless experiences through integrity, creativity, and precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-5">Quick Links</div>
          <div className="flex flex-col gap-3">
            {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm text-cream/70 hover:text-cream transition-colors duration-200">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-5">Get In Touch</div>
          <div className="flex flex-col gap-4">
            <a href="tel:7990669907" className="flex items-center gap-3 text-sm text-cream/70 hover:text-cream transition-colors">
              <Phone size={15} className="text-gold" />
              7990669907
            </a>
            <a href="mailto:rectitude.events@gmail.com" className="flex items-center gap-3 text-sm text-cream/70 hover:text-cream transition-colors">
              <Mail size={15} className="text-gold" />
              rectitude.events@gmail.com
            </a>
            <a href="https://instagram.com/rectitude.events" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-cream/70 hover:text-cream transition-colors">
              <Instagram size={15} className="text-gold" />
              @rectitude.events
            </a>
            <a href="https://facebook.com/RectitudeEvents" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-cream/70 hover:text-cream transition-colors">
              <Facebook size={15} className="text-gold" />
              Rectitude Events
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-cream/40">
          <span>© {new Date().getFullYear()} Rectitude Events. All rights reserved.</span>
          <span className="italic font-display">"Every event is an emotion. We honour it with integrity, passion, and perfection."</span>
        </div>
      </div>
    </footer>
  )
}
