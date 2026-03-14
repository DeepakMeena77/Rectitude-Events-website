import React, { useState } from 'react'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

// 🔑 Change this to your desired admin password
const ADMIN_PASSWORD = 'rectitude@admin123'

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-brown-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px'
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(123,79,140,0.2) 0%, transparent 70%)'
      }} />

      <div className={`relative w-full max-w-sm ${shake ? 'animate-[shake_0.3s_ease]' : ''}`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-gold" />
          </div>
          <div className="font-display text-2xl font-semibold text-cream">Admin Panel</div>
          <div className="font-body text-xs tracking-[0.2em] text-gold uppercase mt-1">Rectitude Events</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream rounded-sm p-8 shadow-2xl">
          <div className="mb-6">
            <label className="font-body text-xs uppercase tracking-wide text-brown/60 mb-2 block">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false) }}
                placeholder="Enter password"
                className={`w-full bg-white border rounded-sm px-4 py-3 pr-10 font-body text-sm text-brown focus:outline-none transition-colors ${
                  error ? 'border-red-400 focus:border-red-400' : 'border-brown/20 focus:border-plum'
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-red-500 text-xs font-body">
                <AlertCircle size={13} /> Incorrect password. Please try again.
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-brown text-cream py-3 rounded-sm font-body font-semibold text-sm tracking-wide hover:bg-plum transition-colors duration-300"
          >
            Access Admin Panel
          </button>
        </form>

        <p className="text-center font-body text-cream/30 text-xs mt-6">
          This area is restricted to authorized personnel only.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  )
}
