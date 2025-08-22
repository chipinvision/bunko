-- Fix security issues in words and daily_stats tables

-- First, make user_id NOT NULL for both tables since they're used for RLS
ALTER TABLE public.words 
ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE public.daily_stats 
ALTER COLUMN user_id SET NOT NULL;

-- Create RLS policies for words table
CREATE POLICY "Users can view their own words" 
ON public.words 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own words" 
ON public.words 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own words" 
ON public.words 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own words" 
ON public.words 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for daily_stats table
CREATE POLICY "Users can view their own daily stats" 
ON public.daily_stats 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own daily stats" 
ON public.daily_stats 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily stats" 
ON public.daily_stats 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily stats" 
ON public.daily_stats 
FOR DELETE 
USING (auth.uid() = user_id);