-- Migration: Create Newsletter Subscribers Table

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS (Row Level Security)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so people can subscribe from the website)
CREATE POLICY "Allow public insert to newsletter_subscribers"
    ON public.newsletter_subscribers
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow admins/service role to view all
CREATE POLICY "Allow service role to select newsletter_subscribers"
    ON public.newsletter_subscribers
    FOR SELECT
    TO service_role
    USING (true);

-- Set up an automatic trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_newsletter_subscribers_updated_at
BEFORE UPDATE ON public.newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
