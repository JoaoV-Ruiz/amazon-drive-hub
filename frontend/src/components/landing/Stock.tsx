import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gauge, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

type Vehicle = {
  id: number;
  model: string;
  km: string;
  price: string;
  image: string;
};

const vehicles: Vehicle[] = [
  { 
    id: 1, 
    model: "VW Polo 2023", 
    km: "32.000 km", 
    price: "R$ 89.900", 
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 2, 
    model: "Fiat Argo 2022", 
    km: "41.500 km", 
    price: "R$ 74.500", 
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 3, 
    model: "Jeep Renegade 2021", 
    km: "58.200 km", 
    price: "R$ 112.900", 
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 4, 
    model: "Hyundai HB20 2023", 
    km: "22.000 km", 
    price: "R$ 82.300", 
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 5, 
    model: "Toyota Corolla 2022", 
    km: "47.800 km", 
    price: "R$ 135.000", 
    image: "https://images.unsplash.com/photo-1621007947382-cc34a621113e?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 6, 
    model: "Chevrolet Onix 2023", 
    km: "29.000 km", 
    price: "R$ 79.900", 
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600" 
  },
];

// Tripling the list to enable a seamless infinite loop wrapping effect
const extendedVehicles = [...vehicles, ...vehicles, ...vehicles];

export function Stock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(6); // Start at the middle set
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cardWidth, setCardWidth] = useState(300);
  const [canClick, setCanClick] = useState(true);
  const gap = 24; // gap-6 is 24px

  // Measure card width dynamically for flawless layout translations
  const updateWidth = () => {
    if (containerRef.current) {
      const firstCard = containerRef.current.querySelector(".carousel-card");
      if (firstCard) {
        setCardWidth(firstCard.getBoundingClientRect().width);
      }
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateWidth);
      observer.disconnect();
    };
  }, []);

  // Re-enable transition after index resets instantly
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleNext = () => {
    if (!canClick) return;
    setCanClick(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!canClick) return;
    setCanClick(false);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= 12) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - 6);
    } else if (currentIndex <= 5) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + 6);
    }
    setCanClick(true);
  };

  return (
    <section id="estoque" className="scroll-reveal relative z-0 -mt-[40px] pt-10 pb-16 lg:pt-14 lg:pb-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
            Estoque
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold italic text-brand-green">
            Veículos em destaque
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Carros revisados, com procedência e prontos para rodar.
          </p>
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-brand-green border border-border shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-brand-green border border-border shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Próximo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Left Gradient Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10 hidden sm:block" />

          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10 hidden sm:block" />

          {/* Carousel Viewport */}
          <div ref={containerRef} className="overflow-hidden px-1">
            {/* Carousel Track */}
            <div
              onTransitionEnd={handleTransitionEnd}
              className="flex gap-6"
              style={{
                transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
                transition: isTransitioning
                  ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
            >
              {extendedVehicles.map((v, index) => (
                <div
                  key={`${v.id}-${index}`}
                  className="carousel-card w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0"
                >
                  <Card
                    className="overflow-hidden rounded-lg border-border/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 py-0 gap-0 h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                        <img 
                          src={v.image} 
                          alt={v.model} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-5 pb-0">
                        <h3 className="font-bold text-lg text-brand-green">{v.model}</h3>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Gauge className="h-4 w-4" />
                          {v.km}
                        </div>
                        <div className="mt-3 text-2xl font-extrabold text-foreground">{v.price}</div>
                      </div>
                    </div>
                    <div className="p-5 pt-4">
                      <div className="flex gap-2">
                        <Link to={`/carro/${v.id}`} className="flex-1 flex">
                          <Button
                            variant="outline"
                            className="w-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-semibold cursor-pointer"
                          >
                            Ver detalhes
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          className="bg-brand-green hover:bg-brand-green/90 text-white cursor-pointer"
                          aria-label="WhatsApp"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/estoque">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold h-12 px-8 cursor-pointer"
            >
              Ver todo o estoque
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
