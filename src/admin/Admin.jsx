import React, { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('re_admin') === 'true')

  const handleLogin = () => {
    sessionStorage.setItem('re_admin', 'true')
    setAuthed(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('re_admin')
    setAuthed(false)
  }

  return authed
    ? <AdminDashboard onLogout={handleLogout} />
    : <AdminLogin onLogin={handleLogin} />
}
