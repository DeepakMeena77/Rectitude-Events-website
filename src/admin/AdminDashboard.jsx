import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import {
  LogOut, Plus, Pencil, Trash2, Loader2, CheckCircle,
  Package, Wrench, X, Star, Save
} from 'lucide-react'

const TABS = ['Packages', 'Services']

// ── MODAL ──────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-brown/10">
          <h3 className="font-display text-xl font-semibold text-brown">{title}</h3>
          <button onClick={onClose} className="text-brown/40 hover:text-brown"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ── PACKAGE FORM ───────────────────────────────────────────────────────────
function PackageForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || {
    name: '', description: '', price: '', category: 'Social & Personal',
    features: [''], is_featured: false,
  })
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setFeature = (i, v) => {
    const arr = [...form.features]; arr[i] = v; set('features', arr)
  }
  const addFeature = () => set('features', [...form.features, ''])
  const removeFeature = (i) => set('features', form.features.filter((_, idx) => idx !== i))

  const handleSave = async () => {
    if (!form.name || !form.price) return
    setSaving(true)
    const payload = { ...form, features: form.features.filter(Boolean) }
    try {
      if (form.id) {
        await supabase.from('packages').update(payload).eq('id', form.id)
      } else {
        await supabase.from('packages').insert(payload)
      }
      onSave()
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const inp = "w-full bg-cream border border-brown/20 rounded-sm px-3 py-2.5 font-body text-sm text-brown focus:outline-none focus:border-plum transition-colors"

  return (
    <div className="space-y-4">
      <div>
        <label className="label-xs">Package Name *</label>
        <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Gold Experience" className={inp} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-xs">Price *</label>
          <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. ₹49,999" className={inp} />
        </div>
        <div>
          <label className="label-xs">Category</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} className={inp}>
            {['Social & Personal', 'Corporate & Large Events', 'Wedding', 'General'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label-xs">Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2} className={`${inp} resize-none`} />
      </div>
      <div>
        <label className="label-xs">Features</label>
        {form.features.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={f} onChange={e => setFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className={`${inp} flex-1`} />
            <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600 p-2"><X size={14} /></button>
          </div>
        ))}
        <button onClick={addFeature} className="text-plum text-xs font-body flex items-center gap-1 mt-1 hover:text-plum-dark">
          <Plus size={13} /> Add Feature
        </button>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="accent-plum" />
        <span className="font-body text-sm text-brown">Mark as Featured / Most Popular</span>
      </label>
      <div className="flex gap-3 pt-2">
        <button onClick={handleSave} disabled={saving} className="flex-1 bg-brown text-cream py-2.5 rounded-sm font-body text-sm font-semibold hover:bg-plum transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {form.id ? 'Update Package' : 'Add Package'}
        </button>
        <button onClick={onClose} className="px-4 border border-brown/20 rounded-sm text-brown font-body text-sm hover:bg-cream-dark">Cancel</button>
      </div>
    </div>
  )
}

// ── SERVICE FORM ───────────────────────────────────────────────────────────
function ServiceForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || {
    name: '', description: '', icon: '✦', category: 'Corporate Events',
  })
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.name) return
    setSaving(true)
    try {
      if (form.id) {
        await supabase.from('services').update(form).eq('id', form.id)
      } else {
        await supabase.from('services').insert(form)
      }
      onSave()
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const inp = "w-full bg-cream border border-brown/20 rounded-sm px-3 py-2.5 font-body text-sm text-brown focus:outline-none focus:border-plum transition-colors"

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="label-xs">Icon (Emoji)</label>
          <input value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="🎤" className={inp} />
        </div>
        <div className="col-span-3">
          <label className="label-xs">Service Name *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Service name" className={inp} />
        </div>
      </div>
      <div>
        <label className="label-xs">Category</label>
        <select value={form.category} onChange={e => set('category', e.target.value)} className={inp}>
          {['Corporate Events', 'Social & Personal', 'Public & Large-Scale'].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="label-xs">Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={`${inp} resize-none`} placeholder="Brief description of this service..." />
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={handleSave} disabled={saving} className="flex-1 bg-brown text-cream py-2.5 rounded-sm font-body text-sm font-semibold hover:bg-plum transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {form.id ? 'Update Service' : 'Add Service'}
        </button>
        <button onClick={onClose} className="px-4 border border-brown/20 rounded-sm text-brown font-body text-sm hover:bg-cream-dark">Cancel</button>
      </div>
    </div>
  )
}

// ── MAIN DASHBOARD ─────────────────────────────────────────────────────────
export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('Packages')
  const [packages, setPackages] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | { type, data? }
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [{ data: p }, { data: s }] = await Promise.all([
        supabase.from('packages').select('*').order('created_at'),
        supabase.from('services').select('*').order('category'),
      ])
      setPackages(p || [])
      setServices(s || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const handleSave = () => {
    setModal(null)
    fetchAll()
    showToast('Saved successfully!')
  }

  const deleteItem = async (table, id) => {
    try {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) {
        console.error('Delete error:', error)
        showToast('Error deleting item.')
      } else {
        fetchAll()
        showToast('Deleted.')
      }
    } catch (e) {
      console.error(e)
      showToast('Error deleting item.')
    } finally {
      setModal(null)
    }
  }

  return (
    <div className="min-h-screen bg-cream-dark">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-brown text-cream px-5 py-3 rounded-sm shadow-lg flex items-center gap-2 font-body text-sm animate-[fadeUp_0.3s_ease]">
          <CheckCircle size={16} className="text-gold" /> {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-brown-dark border-b border-cream/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-gold/20 border border-gold/30 flex items-center justify-center">
              <span className="font-display text-gold font-bold">R</span>
            </div>
            <div>
              <div className="font-display text-cream font-semibold">Rectitude Events</div>
              <div className="font-body text-xs text-gold/70">Admin Panel</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 font-body text-sm text-cream/60 hover:text-cream transition-colors"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Packages', val: packages.length, icon: Package, color: 'plum' },
            { label: 'Featured Packages', val: packages.filter(p => p.is_featured).length, icon: Star, color: 'gold' },
            { label: 'Total Services', val: services.length, icon: Wrench, color: 'brown' },
            { label: 'Service Categories', val: [...new Set(services.map(s => s.category))].length, icon: Package, color: 'plum' },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-sm border border-brown/10 p-4">
              <div className="font-display text-3xl font-bold text-brown mb-1">{val}</div>
              <div className="font-body text-xs text-brown/50 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-sm font-body text-sm font-medium transition-all ${
                tab === t ? 'bg-brown text-cream shadow' : 'bg-white border border-brown/20 text-brown hover:border-plum'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-sm border border-brown/10 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-brown/10">
            <h2 className="font-display text-xl font-semibold text-brown">
              Manage {tab}
            </h2>
            <button
              onClick={() => setModal({ type: tab === 'Packages' ? 'pkg' : 'svc', data: null })}
              className="flex items-center gap-2 bg-brown text-cream px-4 py-2 rounded-sm font-body text-sm font-medium hover:bg-plum transition-colors"
            >
              <Plus size={15} /> Add {tab === 'Packages' ? 'Package' : 'Service'}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={28} className="animate-spin text-plum" />
            </div>
          ) : tab === 'Packages' ? (
            <div className="divide-y divide-brown/5">
              {packages.length === 0 && (
                <div className="text-center py-16 text-brown/40 font-body">No packages yet. Add your first package!</div>
              )}
              {packages.map(pkg => (
                <div key={pkg.id} className="px-6 py-4 flex items-start justify-between hover:bg-cream/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-body font-semibold text-brown text-sm">{pkg.name}</span>
                      {pkg.is_featured && (
                        <span className="bg-gold/20 text-gold text-[10px] font-body font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide">Featured</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-brown/50 font-body">
                      <span className="text-plum font-semibold text-sm">{pkg.price}</span>
                      <span>·</span>
                      <span>{pkg.category}</span>
                      {pkg.features?.length > 0 && <><span>·</span><span>{pkg.features.length} features</span></>}
                    </div>
                    {pkg.description && <p className="font-body text-xs text-brown/40 mt-1 truncate max-w-md">{pkg.description}</p>}
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => setModal({ type: 'pkg', data: pkg })}
                      className="p-2 text-brown/40 hover:text-plum hover:bg-plum/10 rounded-sm transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setModal({ type: 'delete', data: { table: 'packages', id: pkg.id, name: pkg.name } })}
                      className="p-2 text-brown/40 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-brown/5">
              {services.length === 0 && (
                <div className="text-center py-16 text-brown/40 font-body">No services yet. Add your first service!</div>
              )}
              {services.map(svc => (
                <div key={svc.id} className="px-6 py-4 flex items-start justify-between hover:bg-cream/50 transition-colors">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0">{svc.icon || '✦'}</span>
                    <div className="min-w-0">
                      <div className="font-body font-semibold text-brown text-sm mb-0.5">{svc.name}</div>
                      <div className="text-xs text-plum font-body mb-1">{svc.category}</div>
                      {svc.description && <p className="font-body text-xs text-brown/40 truncate max-w-md">{svc.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => setModal({ type: 'svc', data: svc })}
                      className="p-2 text-brown/40 hover:text-plum hover:bg-plum/10 rounded-sm transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setModal({ type: 'delete', data: { table: 'services', id: svc.id, name: svc.name } })}
                      className="p-2 text-brown/40 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {modal?.type === 'pkg' && (
        <Modal title={modal.data ? 'Edit Package' : 'Add New Package'} onClose={() => setModal(null)}>
          <PackageForm initial={modal.data} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'svc' && (
        <Modal title={modal.data ? 'Edit Service' : 'Add New Service'} onClose={() => setModal(null)}>
          <ServiceForm initial={modal.data} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'delete' && (
        <Modal title="Confirm Deletion" onClose={() => setModal(null)}>
          <div className="p-6 text-center pt-8">
            <Trash2 size={40} className="mx-auto text-red-400 mb-4" />
            <h3 className="font-display text-2xl text-brown mb-2">Delete {modal.data.table === 'packages' ? 'Package' : 'Service'}</h3>
            <p className="font-body text-brown/70 mb-8 max-w-sm mx-auto leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-brown">{modal.data.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setModal(null)}
                className="px-6 py-2.5 rounded-sm font-body text-sm text-brown border border-brown/20 hover:bg-brown/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteItem(modal.data.table, modal.data.id)}
                className="px-6 py-2.5 rounded-sm font-body text-sm bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/20 transition-all"
              >
                Yes, Delete It
              </button>
            </div>
          </div>
        </Modal>
      )}
      <style>{`.label-xs { @apply font-body text-xs uppercase tracking-wide text-brown/60 mb-1.5 block; }`}</style>
    </div>
  )
}
