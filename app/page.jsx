"use client"
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import { useAuth } from './context/AuthContext';

export default function Home() {

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      window.location.href = "/profile"; 
    }
    // return () => router.push("/");
  }, [user]);

  return (
   <>
   
   <HeroSection/>
   <Features/>
   <Testimonials/>

   </>
  )
}
