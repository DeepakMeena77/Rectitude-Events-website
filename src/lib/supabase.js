import { createClient } from '@supabase/supabase-js'

// 🔑 Replace these with your actual Supabase credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/*
  ─── SUPABASE SETUP INSTRUCTIONS ──────────────────────────────────────────────

  1. Go to https://supabase.com and create a new project
  2. Replace SUPABASE_URL and SUPABASE_ANON_KEY above with your project values
     (found in: Project Settings → API)

  3. Run this SQL in your Supabase SQL Editor to create tables:

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

  -- Enable Row Level Security and allow public read
  ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
  ALTER TABLE services ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "Public can read packages" ON packages FOR SELECT USING (true);
  CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);
  CREATE POLICY "All ops on packages" ON packages FOR ALL USING (true);
  CREATE POLICY "All ops on services" ON services FOR ALL USING (true);

  ──────────────────────────────────────────────────────────────────────────────
*/
