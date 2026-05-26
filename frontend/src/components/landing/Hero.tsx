import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force muted and autoplay programmatically to satisfy browser policies
      video.defaultMuted = true;
      video.muted = true;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Video autoplay prevented by browser policies:", error);
        });
      }
    }
  }, []);

  return (
    <section className="hero relative z-10 w-full h-[70vh] min-h-[500px] overflow-hidden clip-diagonal flex items-center bg-black text-white">
      {/* Background Video */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline 
        className="hero-video absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/0526.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for readability */}
      <div className="hero-overlay absolute inset-0 bg-black/45 z-10 pointer-events-none"></div>

      {/* Hero Content */}
      <div className="hero-content relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <span className="inline-block bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full animate-fade-in">
            Sua estrada começa aqui.
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold italic leading-[1.05] tracking-tight">
            Encontre o veículo <br />
            <span className="text-white/90">ideal para você</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-lg">
            Compra, venda e repasse com transparência e confiança.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/estoque">
              <Button
                size="lg"
                className="bg-brand-red hover:bg-brand-red/90 text-white font-bold h-12 px-7 shadow-lg shadow-brand-red/30 cursor-pointer"
              >
                Ver estoque
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

