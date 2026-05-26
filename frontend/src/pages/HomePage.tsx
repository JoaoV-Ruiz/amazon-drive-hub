import { useEffect } from 'react';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Stock } from '@/components/landing/Stock';
import { MostSearched } from '@/components/landing/MostSearched';
import { Services } from '@/components/landing/Services';
import { CtaBanner } from '@/components/landing/CtaBanner';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  useEffect(() => {
    // Select all sections configured for scroll reveal
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    // Intersection Observer with custom offset triggers for natural entry feel
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.08, // Trigger when 8% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Decenter bottom trigger margin
      }
    );

    reveals.forEach((el) => observer.observe(el));

    // Cleanup observer connection to prevent leaks
    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero loads instantly for ideal LCP metrics */}
        <Hero />
        
        {/* Sections slide up smoothly and fade in as they roll into viewport */}
        <div className="scroll-reveal">
          <Stock />
        </div>
        
        <div className="scroll-reveal">
          <MostSearched />
        </div>
        
        <div className="scroll-reveal">
          <Services />
        </div>
        
        <div className="scroll-reveal">
          <CtaBanner />
        </div>
      </main>
      <Footer />
    </>
  );
}
