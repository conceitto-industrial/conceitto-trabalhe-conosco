
-- Create admin_users table for scalable admin management
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Insert the existing admin users
INSERT INTO public.admin_users (email) VALUES 
  ('admin@empresa.com'),
  ('camila.moreira@conceitto.ind.br');

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view admin users table
CREATE POLICY "Admins can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (public.is_admin());

-- Create policy for admins to manage admin users
CREATE POLICY "Admins can manage admin users" 
  ON public.admin_users 
  FOR ALL 
  USING (public.is_admin());

-- Update the is_admin function to use the admin_users table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    JOIN public.admin_users ON auth.users.email = public.admin_users.email
    WHERE auth.users.id = auth.uid() 
    AND public.admin_users.is_active = true
  );
$$;
