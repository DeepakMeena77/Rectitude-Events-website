import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

function useReveal() {
  useEffect(() => {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
        { threshold: 0.1 }
      )
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 100)
  }, [])
}

const SAMPLE_SERVICES = [
  { id: 1, name: 'Product & Brand Launches', category: 'Corporate Events', description: 'Stage design, AV production, media management, influencer integration.', icon: '🚀' },
  { id: 2, name: 'Corporate Conferences', category: 'Corporate Events', description: 'Venue planning, speaker coordination, registration, live streaming.', icon: '🎤' },
  { id: 3, name: 'Trade Shows & Exhibitions', category: 'Corporate Events', description: 'Stall design, fabrication, branding, visitor flow, lead capture systems.', icon: '🏛️' },
  { id: 4, name: 'Employee Engagement', category: 'Corporate Events', description: 'Team-building, sports days, annual celebrations, recognition ceremonies.', icon: '🤝' },
  { id: 5, name: 'Weddings (All Cultures)', category: 'Social & Personal', description: 'Themes, décor, mandap setup, guest management, hospitality, choreography.', icon: '💍' },
  { id: 6, name: 'Pre-Wedding Events', category: 'Social & Personal', description: 'Haldi, Sangeet, Mehendi, engagement, bridal showers, cocktail nights.', icon: '💐' },
  { id: 7, name: 'Birthday Parties', category: 'Social & Personal', description: 'Themes, entertainment, décor, games, photo booths, customised cakes.', icon: '🎂' },
  { id: 8, name: 'Baby Showers & Naming', category: 'Social & Personal', description: 'Thematic décor, games, photography, giveaways for new arrivals.', icon: '👶' },
  { id: 9, name: 'Exhibitions & Expos', category: 'Public & Large-Scale', description: 'Stall allotment, branding zones, vendor coordination, registrations, security.', icon: '🏟️' },
  { id: 10, name: 'Cultural Festivals', category: 'Public & Large-Scale', description: 'Stage production, cultural programming, permissions, artist lineup, ticketing.', icon: '🎪' },
  { id: 11, name: 'College Fests', category: 'Public & Large-Scale', description: 'Celebrity management, logistics, stage design, sponsor coordination.', icon: '🎓' },
]

const SAMPLE_PACKAGES = [
  {
    id: 1, name: 'Silver Celebration', price: '₹49,999', category: 'Social & Personal', is_featured: false,
    description: 'Perfect for intimate gatherings and smaller celebrations.',
    features: ['Venue coordination', 'Basic décor setup', 'Photography (4 hrs)', 'Event anchor', 'On-site coordinator'],
  },
  {
    id: 2, name: 'Gold Experience', price: '₹1,49,999', category: 'Social & Personal', is_featured: true,
    description: 'Our most popular package — the complete celebration experience.',
    features: ['Venue + vendor management', 'Full thematic décor', 'Cinematic photography & video', 'Entertainment (DJ/artist)', 'Live streaming', 'F&B coordination', 'Dedicated team'],
  },
  {
    id: 3, name: 'Platinum Grand', price: 'Custom Quote', category: 'Corporate & Large Events', is_featured: false,
    description: 'For large-scale events, weddings & high-profile corporate occasions.',
    features: ['Full end-to-end management', '3D venue design & fabrication', 'AV production & LED walls', 'Celebrity/artist management', 'Multi-day event support', 'Safety & security planning', 'Post-event review'],
  },
]

const categoryOrder = ['Corporate Events', 'Social & Personal', 'Public & Large-Scale']

export default function Services() {
  useReveal()
  const [services, setServices] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => {
    async function fetchData() {
      try {
        const [{ data: svcs }, { data: pkgs }] = await Promise.all([
          supabase.from('services').select('*').order('category'),
          supabase.from('packages').select('*').order('created_at'),
        ])
        setServices(svcs?.length ? svcs : SAMPLE_SERVICES)
        setPackages(pkgs?.length ? pkgs : SAMPLE_PACKAGES)
      } catch {
        setServices(SAMPLE_SERVICES)
        setPackages(SAMPLE_PACKAGES)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const categories = ['All', ...categoryOrder]
  const filteredServices = activeTab === 'All' ? services : services.filter(s => s.category === activeTab)

  const grouped = categoryOrder.reduce((acc, cat) => {
    const items = filteredServices.filter(s => s.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-brown-dark to-plum-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        <div className="relative max-w-5xl mx-auto text-center fade-up">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold border border-gold/30 px-4 py-2 rounded-sm">
            What We Offer
          </span>
          <h1 className="font-display text-6xl md:text-7xl font-light text-cream mt-6 mb-4">
            Our <span className="italic font-semibold text-gold">Services</span>
          </h1>
          <p className="font-body text-cream/60 max-w-xl mx-auto">
            Three specialized verticals delivering custom-made solutions across the event spectrum
          </p>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-sm font-body text-xs tracking-wide font-medium transition-all duration-200 ${
                  activeTab === cat
                    ? 'bg-brown text-cream shadow'
                    : 'bg-white border border-brown/20 text-brown hover:border-plum hover:text-plum'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin text-plum" />
            </div>
          ) : (
            Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-3xl font-semibold text-brown">{cat}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map(svc => (
                    <div key={svc.id} className="service-card bg-white border border-brown/10 rounded-sm p-6 hover:border-plum/30">
                      <div className="text-3xl mb-4">{svc.icon || '✦'}</div>
                      <h3 className="font-display text-lg font-semibold text-brown mb-2">{svc.name}</h3>
                      <p className="font-body text-sm text-brown/60 leading-relaxed">{svc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PACKAGES ── */}
      <section className="py-24 px-6 bg-cream-dark">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">Pricing</span>
            <h2 className="font-display text-5xl font-light text-brown mt-3">
              Our <span className="italic">Packages</span>
            </h2>
            <p className="font-body text-brown/60 mt-4 max-w-md mx-auto text-sm">
              Choose a package or request a custom quote tailored to your needs
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin text-plum" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map(pkg => (
                <div key={pkg.id} className={`relative rounded-sm border ${
                  pkg.is_featured
                    ? 'border-plum bg-plum text-cream shadow-2xl scale-[1.02]'
                    : 'border-brown/15 bg-white text-brown'
                } p-8 transition-all hover:shadow-lg`}>
                  {pkg.is_featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-brown-dark px-4 py-1 rounded-sm text-xs font-body font-semibold tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <div className={`font-body text-xs tracking-[0.2em] uppercase mb-2 ${pkg.is_featured ? 'text-gold' : 'text-plum'}`}>
                    {pkg.category}
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-2">{pkg.name}</h3>
                  <div className={`font-display text-4xl font-bold mb-3 ${pkg.is_featured ? 'text-gold' : 'text-plum'}`}>
                    {pkg.price}
                  </div>
                  <p className={`font-body text-sm mb-6 leading-relaxed ${pkg.is_featured ? 'text-cream/70' : 'text-brown/60'}`}>
                    {pkg.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {(pkg.features || []).map((f, i) => (
                      <li key={i} className={`flex items-start gap-2 font-body text-sm ${pkg.is_featured ? 'text-cream/80' : 'text-brown/70'}`}>
                        <span className={`mt-0.5 ${pkg.is_featured ? 'text-gold' : 'text-plum'}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`w-full block text-center py-3 rounded-sm font-body font-semibold text-sm tracking-wide transition-all duration-300 ${
                      pkg.is_featured
                        ? 'bg-gold text-brown-dark hover:bg-gold-light'
                        : 'bg-brown text-cream hover:bg-plum'
                    }`}
                  >
                    Book This Package
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="reveal text-center mt-12">
            <p className="font-body text-brown/50 text-sm mb-4">Need something custom? We'll build it for you.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 font-body text-plum text-sm font-medium border-b border-plum/40 pb-0.5 hover:border-plum transition-colors">
              Request a Custom Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── END-TO-END ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">Complete Solutions</span>
            <h2 className="font-display text-5xl font-light text-brown mt-3">
              End-to-End <span className="italic">Services</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'Planning & Conceptualization', d: 'Theme ideation, budget planning, timelines, vendor management.', icon: '📋' },
              { t: 'Design & Production', d: 'Stage design, thematic decoration, 3D layouts, fabrication, branding.', icon: '🎨' },
              { t: 'Technical Support', d: 'Sound & light, LED walls, AV production, live streaming, special effects.', icon: '🔊' },
              { t: 'Operations & Logistics', d: 'Venue coordination, transport, vendor management, F&B, hospitality.', icon: '🚚' },
              { t: 'Entertainment & Artists', d: 'Anchors, singers, dancers, DJs, celebrities, folk artists, custom acts.', icon: '🎭' },
              { t: 'Photography & Videography', d: 'Cinematic films, event after-movies, social media content, live coverage.', icon: '📸' },
            ].map(({ t, d, icon }) => (
              <div key={t} className="reveal service-card bg-white border border-brown/10 rounded-sm p-6 hover:border-gold/30">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display text-lg font-semibold text-brown mb-2">{t}</h3>
                <p className="font-body text-sm text-brown/60 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
