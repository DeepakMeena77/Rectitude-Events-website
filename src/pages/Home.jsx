import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Sparkles, Users, Calendar } from 'lucide-react'
import { supabase } from '../lib/supabase'

// Scroll reveal hook
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const stats = [
  { icon: Calendar, label: 'Events Delivered', value: '500+' },
  { icon: Users, label: 'Happy Clients', value: '300+' },
  { icon: Star, label: 'Years of Excellence', value: '10+' },
  { icon: Sparkles, label: 'Cities Covered', value: '15+' },
]

const highlights = [
  { title: 'Corporate Events', desc: 'Brand launches, conferences, trade shows & employee engagement.', icon: '🏢' },
  { title: 'Social & Personal', desc: 'Weddings, pre-wedding events, birthdays & baby showers.', icon: '💐' },
  { title: 'Public & Large-Scale', desc: 'Exhibitions, college fests, cultural festivals & community events.', icon: '🎪' },
]

export default function Home() {
  useReveal()

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-brown-dark via-brown to-plum-dark opacity-90" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(123,79,140,0.2) 0%, transparent 50%)'
        }} />
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="fade-up">
            <span className="inline-block font-body text-xs tracking-[0.35em] uppercase text-gold border border-gold/40 px-4 py-2 rounded-sm mb-8">
              An Attitude to Make People Tension Free
            </span>
          </div>

          <h1 className="fade-up-delay-1 font-display text-6xl md:text-8xl font-light text-cream leading-[0.9] mb-6">
            Crafting<br />
            <span className="italic font-semibold" style={{ color: '#C9A84C' }}>Unforgettable</span><br />
            Experiences
          </h1>

          <p className="fade-up-delay-2 font-body text-base text-cream/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Your trusted event management partner delivering flawless experiences through integrity, creativity, and precision — for over a decade.
          </p>

          <div className="fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group bg-gold text-brown-dark px-8 py-4 rounded-sm font-body font-semibold text-sm tracking-wide hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              Plan Your Event
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="border border-cream/30 text-cream px-8 py-4 rounded-sm font-body font-medium text-sm tracking-wide hover:border-gold hover:text-gold transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold animate-pulse" />
          <span className="font-body text-[10px] tracking-[0.3em] text-gold uppercase">Scroll</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-cream-dark py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="reveal text-center">
              <Icon size={22} className="mx-auto mb-3 text-plum" />
              <div className="font-display text-4xl font-semibold text-brown mb-1">{value}</div>
              <div className="font-body text-xs tracking-wide text-brown/60 uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHAT WE DO ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">Our Expertise</span>
            <h2 className="font-display text-5xl md:text-6xl font-light text-brown mt-3 mb-4">
              What We <span className="italic">Do</span>
            </h2>
            <p className="text-brown/60 font-body max-w-xl mx-auto">
              Three specialized verticals delivering custom-made solutions across the event spectrum
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map(({ title, desc, icon }) => (
              <div key={title} className="reveal service-card bg-white border border-brown/10 rounded-sm p-8 hover:border-plum/30">
                <div className="text-4xl mb-5">{icon}</div>
                <h3 className="font-display text-2xl font-semibold text-brown mb-3">{title}</h3>
                <p className="font-body text-sm text-brown/60 leading-relaxed mb-5">{desc}</p>
                <Link to="/services" className="text-xs font-body text-plum tracking-wide uppercase border-b border-plum/40 pb-0.5 hover:border-plum transition-colors">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 px-6 bg-brown-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A84C 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">Why Us</span>
            <h2 className="font-display text-5xl md:text-6xl font-light text-cream mt-3">
              The Rectitude <span className="italic text-gold">Difference</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Creative Vision', desc: 'Original concepts tailored to every client\'s story and brand identity.', num: '01' },
              { title: 'Flawless Execution', desc: 'Every detail managed with meticulous precision from concept to close.', num: '02' },
              { title: 'Personal Commitment', desc: 'Dedicated attention to make your planning effortless and stress-free.', num: '03' },
            ].map(({ title, desc, num }) => (
              <div key={num} className="reveal border border-cream/10 rounded-sm p-8 hover:border-gold/30 transition-colors">
                <div className="font-display text-5xl text-gold/20 font-bold mb-4">{num}</div>
                <h3 className="font-display text-xl text-cream font-semibold mb-3">{title}</h3>
                <p className="font-body text-sm text-cream/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center">
        <div className="reveal max-w-2xl mx-auto">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">Ready to Begin?</span>
          <h2 className="font-display text-5xl font-light text-brown mt-3 mb-6">
            Let's Create Something <span className="italic">Beautiful</span>
          </h2>
          <p className="font-body text-brown/60 mb-10 leading-relaxed">
            From intimate gatherings to grand celebrations — we handle every detail so you can be present in every moment.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-plum text-cream px-10 py-4 rounded-sm font-body font-semibold text-sm tracking-wide hover:bg-plum-dark transition-all duration-300 shadow-lg hover:shadow-plum/30"
          >
            Start Planning Today
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
