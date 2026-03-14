# Rectitude Events — Website

A full-featured event management website built with **React + Vite + Tailwind CSS**, connected to **Supabase** (backend) and **EmailJS** (booking forms).

---

## 🗂️ Project Structure

```
src/
├── pages/
│   ├── Home.jsx          # Landing page
│   ├── About.jsx         # About page
│   ├── Services.jsx      # Services + Packages (fetched from Supabase)
│   └── Contact.jsx       # Booking form (sends via EmailJS)
├── admin/
│   ├── Admin.jsx         # Auth wrapper
│   ├── AdminLogin.jsx    # Password login page
│   └── AdminDashboard.jsx# Manage packages & services
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
├── lib/
│   └── supabase.js       # Supabase client config
└── App.jsx               # Routing
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 🔑 Step-by-Step Configuration

### A. Supabase Setup

1. Go to [https://supabase.com](https://supabase.com) → Create a new project
2. Go to **Project Settings → API** → Copy:
   - Project URL
   - anon/public Key
3. Open `src/lib/supabase.js` and replace:
   ```js
   const SUPABASE_URL = 'YOUR_SUPABASE_URL'
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'
   ```
4. In your Supabase project, go to **SQL Editor** and run:

```sql
-- Packages table
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  features TEXT[],
  category TEXT DEFAULT 'general',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read + full admin access
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "All ops packages" ON packages FOR ALL USING (true);
CREATE POLICY "All ops services" ON services FOR ALL USING (true);
```

---

### B. EmailJS Setup

1. Go to [https://www.emailjs.com](https://www.emailjs.com) → Sign up
2. **Add Email Service**: Connect your Gmail → copy **Service ID**
3. **Create Email Template** with these variables:
   ```
   {{from_name}}     - Customer's name
   {{from_email}}    - Customer's email
   {{phone}}         - Phone number
   {{event_type}}    - Type of event
   {{event_date}}    - Event date
   {{guest_count}}   - Number of guests
   {{budget}}        - Budget range
   {{message}}       - Additional details
   ```
   Set the **To Email** to: `rectitude.events@gmail.com`

4. Copy **Template ID** and go to **Account → API Keys** for **Public Key**

5. Open `src/pages/Contact.jsx` and replace:
   ```js
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
   ```

---

### C. Admin Panel

- **URL**: `yoursite.com/admin`
- **Default Password**: `rectitude@admin123`
- To change the password, open `src/admin/AdminLogin.jsx`:
  ```js
  const ADMIN_PASSWORD = 'rectitude@admin123'  // ← Change this
  ```

---

## 🌐 Deployment (Vercel — Recommended)

1. Push this project to GitHub
2. Go to [https://vercel.com](https://vercel.com) → Import your GitHub repo
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy ✅

---

## 📱 Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, stats, service highlights, CTA |
| `/about` | About — Story, values, capabilities |
| `/services` | Services + Packages (from Supabase) |
| `/contact` | Booking form (via EmailJS) |
| `/admin` | Admin panel (password protected) |

---

## 🎨 Brand Colors

| Name | Hex |
|------|-----|
| Cream | `#F5F0E8` |
| Brown | `#5C3D2E` |
| Plum | `#7B4F8C` |
| Gold | `#C9A84C` |

---

## 📦 Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL)
- **Email**: EmailJS
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond (display) + Jost (body)
