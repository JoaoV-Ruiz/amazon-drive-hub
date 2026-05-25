import { Button } from "@/components/ui/button";
import { ArrowRight, Car } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-brand-green text-white pt-28 pb-32 overflow-hidden clip-diagonal">
      {/* Decorative winding road */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-50 500 C 200 350, 400 600, 600 400 S 1000 250, 1300 450"
          stroke="white"
          strokeWidth="60"
          strokeLinecap="round"
        />
        <path
          d="M-50 500 C 200 350, 400 600, 600 400 S 1000 250, 1300 450"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="20 20"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full">
            Sua estrada começa aqui.
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold italic leading-[1.05] tracking-tight">
            Encontre o veículo <br />
            <span className="text-white/90">ideal para você</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-lg">
            Locação, repasse e venda com transparência e confiança.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bold h-12 px-7 shadow-lg shadow-brand-red/30"
            >
              Ver estoque
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[5/3] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/15 shadow-2xl flex items-center justify-center">
            <Car className="h-40 w-40 text-white/80" strokeWidth={1.2} />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-brand-red text-white px-5 py-3 rounded-xl shadow-xl">
            <div className="text-[10px] uppercase tracking-widest opacity-80">A partir de</div>
            <div className="text-xl font-extrabold">R$ 89/dia</div>
          </div>
        </div>
      </div>
    </section>
  );
}
