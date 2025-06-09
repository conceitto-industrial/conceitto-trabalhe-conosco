
-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  salary TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table to store job applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  area TEXT,
  message TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spontaneous_applications table for applications without specific job
CREATE TABLE public.spontaneous_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  area TEXT NOT NULL,
  message TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spontaneous_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to jobs
CREATE POLICY "Anyone can view active jobs" 
  ON public.jobs 
  FOR SELECT 
  USING (is_active = true);

-- Create policies for public insert access to applications
CREATE POLICY "Anyone can submit applications" 
  ON public.applications 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can submit spontaneous applications" 
  ON public.spontaneous_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Admin policies will be added after authentication is implemented
-- For now, we'll create a simple admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'admin@empresa.com'
  );
$$;

-- Admin policies for jobs management
CREATE POLICY "Admins can manage jobs" 
  ON public.jobs 
  FOR ALL 
  USING (public.is_admin());

-- Admin policies for viewing applications
CREATE POLICY "Admins can view applications" 
  ON public.applications 
  FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Admins can view spontaneous applications" 
  ON public.spontaneous_applications 
  FOR SELECT 
  USING (public.is_admin());

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false);

-- Create policy for resume uploads
CREATE POLICY "Anyone can upload resumes" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'resumes');

-- Create policy for admin to download resumes
CREATE POLICY "Admins can download resumes" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'resumes' AND public.is_admin());
