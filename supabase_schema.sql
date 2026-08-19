-- Run these SQL commands in your Supabase SQL Editor

-- 1. Create Profiles Table (to store user subscription status)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. Create Payments Table (for UTR submission)
CREATE TABLE public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  plan TEXT NOT NULL,
  utr_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending', -- can be 'pending', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own payments
CREATE POLICY "Users can insert own payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to view their own payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

-- Note: The Admin panel will need to bypass RLS to view all payments and delete them.
-- For a simple project, we can create an Admin policy if needed, or you can temporarily allow all selects for the Admin page:
-- WARNING: This allows anyone to read all payments. For real production, use a secure Admin API route or Admin user role.
CREATE POLICY "Public Read for Admin" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Public Update for Admin" ON public.payments FOR UPDATE USING (true);
CREATE POLICY "Public Delete for Admin" ON public.payments FOR DELETE USING (true);

CREATE POLICY "Public Update Profile for Admin" ON public.profiles FOR UPDATE USING (true);

-- 3. Create Queries Table (for Contact Us page)
CREATE TABLE public.queries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert queries" ON public.queries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read for Admin Queries" ON public.queries FOR SELECT USING (true);
CREATE POLICY "Public Update for Admin Queries" ON public.queries FOR UPDATE USING (true);
CREATE POLICY "Public Delete for Admin Queries" ON public.queries FOR DELETE USING (true);

