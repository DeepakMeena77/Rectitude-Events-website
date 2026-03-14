import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, AlertCircle, Phone, Mail, Instagram, Facebook, Loader2 } from 'lucide-react'

// 🔑 Replace with your EmailJS credentials
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

/*
  ─── EMAILJS SETUP INSTRUCTIONS ──────────────────────────────────────────────
  1. Go to https://www.emailjs.com and sign up
  2. Create an Email Service (Gmail recommended) → copy the Service ID
  3. Create an Email Template with these variables:
       {{from_name}}, {{from_email}}, {{phone}}, {{event_type}},
       {{event_date}}, {{guest_count}}, {{budget}}, {{message}}
     Set recipient email to: rectitude.events@gmail.com
  4. Copy Template ID and Public Key from Account → API Keys
  5. Replace the placeholders above
  ──────────────────────────────────────────────────────────────────────────────
*/

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const eventTypes = [
  'Wedding', 'Pre-Wedding Event', 'Birthday Party', 'Baby Shower / Naming',
  'Corporate Conference', 'Product Launch', 'Trade Show / Exhibition',
  'Employee Engagement', 'Cultural Festival', 'College Fest', 'Other',
]

export default function Contact() {
  useReveal()
  const formRef = useRef(null)
  const [form, setForm] = useState({
    from_name: '', from_email: '', phone: '',
    event_type: '', event_date: '', guest_count: '', budget: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.from_name || !form.from_email || !form.event_type) return

    setStatus('loading')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ from_name: '', from_email: '', phone: '', event_type: '', event_date: '', guest_count: '', budget: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const inputClass = "w-full bg-white border border-brown/20 rounded-sm px-4 py-3 font-body text-sm text-brown placeholder-brown/40 focus:outline-none focus:border-plum transition-colors duration-200"

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-cream to-cream-dark relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-gradient-to-l from-plum/10 to-transparent" />
        <div className="relative max-w-5xl mx-auto fade-up">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold border border-gold/30 px-4 py-2 rounded-sm">
            Let's Connect
          </span>
          <h1 className="font-display text-6xl md:text-7xl font-light text-brown mt-6 mb-4 leading-[0.95]">
            Book Your <br /><span className="italic font-semibold text-plum">Dream Event</span>
          </h1>
          <p className="font-body text-brown/60 max-w-md">
            Fill in your details below and our team will reach out within 24 hours to begin planning.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── MAIN ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="reveal space-y-8">
            <div>
              <div className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Reach Us Directly</div>
              <div className="space-y-4">
                <a href="tel:7990669907" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-sm bg-brown/10 flex items-center justify-center group-hover:bg-plum group-hover:text-cream transition-all">
                    <Phone size={15} className="text-brown group-hover:text-cream" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-brown/40 uppercase tracking-wide">WhatsApp / Call</div>
                    <div className="font-body text-sm font-medium text-brown">7990669907</div>
                  </div>
                </a>
                <a href="mailto:rectitude.events@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-sm bg-brown/10 flex items-center justify-center group-hover:bg-plum group-hover:text-cream transition-all">
                    <Mail size={15} className="text-brown group-hover:text-cream" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-brown/40 uppercase tracking-wide">Email</div>
                    <div className="font-body text-sm font-medium text-brown">rectitude.events@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <div className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Follow Us</div>
              <div className="space-y-3">
                <a href="https://instagram.com/rectitude.events" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-sm bg-brown/10 flex items-center justify-center group-hover:bg-plum transition-all">
                    <Instagram size={15} className="text-brown group-hover:text-cream" />
                  </div>
                  <span className="font-body text-sm text-brown">@rectitude.events</span>
                </a>
                <a href="https://facebook.com/RectitudeEvents" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-sm bg-brown/10 flex items-center justify-center group-hover:bg-plum transition-all">
                    <Facebook size={15} className="text-brown group-hover:text-cream" />
                  </div>
                  <span className="font-body text-sm text-brown">Rectitude Events</span>
                </a>
              </div>
            </div>

            <div className="bg-cream-dark border border-brown/10 rounded-sm p-5">
              <div className="font-display text-lg italic text-plum mb-2">"Every event is an emotion."</div>
              <div className="font-body text-xs text-brown/50">We honour it with integrity, passion, and perfection.</div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="reveal md:col-span-2">
            <div className="bg-white border border-brown/10 rounded-sm p-8 shadow-sm">
              <h2 className="font-display text-3xl font-semibold text-brown mb-2">Event Inquiry Form</h2>
              <p className="font-body text-sm text-brown/50 mb-8">Tell us about your dream event</p>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={56} className="text-green-500 mb-4" />
                  <h3 className="font-display text-3xl text-brown mb-2">Inquiry Sent!</h3>
                  <p className="font-body text-brown/60 mb-6">Our team will reach out within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-brown text-cream px-6 py-2 rounded-sm font-body text-sm font-medium hover:bg-plum transition-colors"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block">Full Name *</label>
                      <input name="from_name" value={form.from_name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                    </div>
                    <div>
                      <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block">Email *</label>
                      <input name="from_email" type="email" value={form.from_email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block">Phone / WhatsApp</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" className={inputClass} />
                    </div>
                    <div>
                      <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block">Event Type *</label>
                      <select name="event_type" value={form.event_type} onChange={handleChange} required className={inputClass}>
                        <option value="">Select event type...</option>
                        {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block">Event Date</label>
                      <input name="event_date" type="date" value={form.event_date} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block">Guest Count</label>
                      <input name="guest_count" value={form.guest_count} onChange={handleChange} placeholder="e.g. 150" className={inputClass} />
                    </div>
                    <div>
                      <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block">Budget Range</label>
                      <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. ₹1-2 Lakhs" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block">Tell Us About Your Event</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      rows={4} placeholder="Describe your vision, requirements, theme ideas..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm font-body bg-red-50 border border-red-200 rounded-sm p-3">
                      <AlertCircle size={16} />
                      Failed to send. Please try again or email us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brown text-cream py-4 rounded-sm font-body font-semibold text-sm tracking-wide hover:bg-plum transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Inquiry</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
