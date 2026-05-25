import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="bg-brand-red text-white py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold italic">
          Quer vender ou repassar seu carro?
        </h2>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
          Fale com a nossa equipe e descubra o melhor valor para o seu veículo.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-white text-brand-red hover:bg-white/90 font-bold h-12 px-7 shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
          Falar no WhatsApp
        </Button>
      </div>
    </section>
  );
}
