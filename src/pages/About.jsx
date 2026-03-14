import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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

const values = [
  { title: 'Integrity', desc: 'We operate with complete transparency and honesty in every client relationship and vendor partnership.', icon: '⚖️' },
  { title: 'Creativity', desc: 'Every event is a blank canvas. We bring original, customised concepts that reflect your unique story.', icon: '🎨' },
  { title: 'Precision', desc: 'From timelines to table settings, we obsess over details so you don\'t have to.', icon: '🎯' },
  { title: 'Commitment', desc: 'We treat your event like our own — with heart, hustle, and unwavering dedication.', icon: '🤝' },
]

const team = [
  { name: 'Event Planning', desc: 'End-to-end coordination with the best local vendors and suppliers.', icon: '📋' },
  { name: 'Design & Decor', desc: 'In-house design team crafting stunning thematic environments.', icon: '✨' },
  { name: 'Tech & AV', desc: 'Professional sound, lighting, LED walls and live streaming setups.', icon: '🎬' },
  { name: 'Artist Management', desc: 'Curated performers, anchors, DJs and celebrity bookings.', icon: '🎤' },
]

export default function About() {
  useReveal()

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream-dark to-cream" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-plum/10 to-transparent" />
        <div className="relative max-w-5xl mx-auto">
          <div className="fade-up max-w-2xl">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold border border-gold/30 px-4 py-2 rounded-sm">
              Our Story
            </span>
            <h1 className="font-display text-6xl md:text-7xl font-light text-brown mt-6 mb-6 leading-[0.95]">
              About<br /><span className="italic font-semibold text-plum">Rectitude</span><br />Events
            </h1>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <p className="font-body text-brown/70 leading-relaxed text-base max-w-lg">
              An all-inclusive event management firm built on integrity, transforming dreams into mesmerizing experiences for over a decade.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── STORY ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">Who We Are</span>
            <h2 className="font-display text-4xl font-light text-brown mt-3 mb-6">
              A Decade of Creating <span className="italic">Magic</span>
            </h2>
            <p className="font-body text-brown/60 leading-relaxed mb-5">
              Rectitude Events was founded with one simple belief — that every event deserves to be extraordinary. From intimate celebrations to large-scale gatherings, we deliver end-to-end solutions with creative precision and seamless execution.
            </p>
            <p className="font-body text-brown/60 leading-relaxed mb-8">
              Over a decade, we've built a reputation as the most trusted event management partner across cities, serving corporate giants, families, and institutions alike. Our team of passionate planners, designers, and coordinators brings hundreds of events to life every year.
            </p>
            <blockquote className="border-l-2 border-gold pl-5 font-display text-xl italic text-plum">
              "Every event is an emotion. We honour it with integrity, passion, and perfection."
            </blockquote>
          </div>

          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { val: '500+', label: 'Events Delivered' },
              { val: '300+', label: 'Happy Clients' },
              { val: '10+', label: 'Years Experience' },
              { val: '15+', label: 'Cities Covered' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-white border border-brown/10 rounded-sm p-6 text-center hover:border-plum/30 transition-colors">
                <div className="font-display text-4xl font-bold text-plum mb-1">{val}</div>
                <div className="font-body text-xs text-brown/50 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── VALUES ── */}
      <section className="py-24 px-6 bg-cream-dark">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">What Drives Us</span>
            <h2 className="font-display text-5xl font-light text-brown mt-3">
              Our Core <span className="italic">Values</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, desc, icon }) => (
              <div key={title} className="reveal bg-white rounded-sm p-7 border border-brown/10 hover:border-gold/40 hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-xl font-semibold text-brown mb-3">{title}</h3>
                <p className="font-body text-sm text-brown/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">Our Capabilities</span>
            <h2 className="font-display text-5xl font-light text-brown mt-3">
              What We <span className="italic">Bring</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map(({ name, desc, icon }) => (
              <div key={name} className="reveal flex gap-5 p-6 rounded-sm border border-brown/10 hover:border-plum/30 transition-all bg-white">
                <div className="text-3xl flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-brown mb-2">{name}</h3>
                  <p className="font-body text-sm text-brown/60 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-plum text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
          backgroundSize: '16px 16px'
        }} />
        <div className="relative reveal max-w-xl mx-auto">
          <h2 className="font-display text-4xl font-light text-cream mb-4">
            Ready to Work With <span className="italic">Us?</span>
          </h2>
          <p className="font-body text-cream/70 mb-8 text-sm">Let's bring your vision to life together.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-brown-dark px-8 py-4 rounded-sm font-body font-semibold text-sm tracking-wide hover:bg-gold-light transition-colors"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
