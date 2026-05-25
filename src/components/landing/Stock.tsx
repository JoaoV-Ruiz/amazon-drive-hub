import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Car, Gauge, MessageCircle } from "lucide-react";

type Vehicle = {
  id: number;
  model: string;
  km: string;
  price: string;
  status: "Disponível" | "Locação";
};

const vehicles: Vehicle[] = [
  { id: 1, model: "VW Polo 2023", km: "32.000 km", price: "R$ 89.900", status: "Disponível" },
  { id: 2, model: "Fiat Argo 2022", km: "41.500 km", price: "R$ 74.500", status: "Locação" },
  { id: 3, model: "Jeep Renegade 2021", km: "58.200 km", price: "R$ 112.900", status: "Disponível" },
  { id: 4, model: "Hyundai HB20 2023", km: "22.000 km", price: "R$ 82.300", status: "Disponível" },
  { id: 5, model: "Toyota Corolla 2022", km: "47.800 km", price: "R$ 135.000", status: "Locação" },
  { id: 6, model: "Chevrolet Onix 2023", km: "29.000 km", price: "R$ 79.900", status: "Disponível" },
];

export function Stock() {
  return (
    <section id="estoque" className="py-20 lg:py-28 bg-white">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <Card
              key={v.id}
              className="overflow-hidden rounded-lg border-border/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 py-0 gap-0"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-secondary to-secondary/40 flex items-center justify-center">
                <Car className="h-20 w-20 text-brand-green/40" strokeWidth={1.2} />
                <Badge
                  className={`absolute top-3 left-3 font-semibold ${
                    v.status === "Disponível"
                      ? "bg-brand-green text-white"
                      : "bg-brand-red text-white"
                  }`}
                >
                  {v.status}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-brand-green">{v.model}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Gauge className="h-4 w-4" />
                  {v.km}
                </div>
                <div className="mt-3 text-2xl font-extrabold text-foreground">{v.price}</div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-semibold"
                  >
                    Ver detalhes
                  </Button>
                  <Button
                    size="icon"
                    className="bg-brand-green hover:bg-brand-green/90 text-white"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-brand-green hover:bg-brand-green/90 text-white font-bold h-12 px-8"
          >
            Ver todo o estoque
          </Button>
        </div>
      </div>
    </section>
  );
}
