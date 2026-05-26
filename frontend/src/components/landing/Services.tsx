import { Car, RefreshCw, Wallet } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Compra & Venda",
    desc: "Compre seu seminovo com garantia ou venda seu usado pelo melhor preço.",
  },
  {
    icon: Wallet,
    title: "Financiamento",
    desc: "Parcerias com os principais bancos para garantir as menores taxas.",
  },
  {
    icon: RefreshCw,
    title: "Avaliação Justa",
    desc: "Avaliamos seu veículo na hora com total transparência e profissionalismo.",
  },
];

export function Services() {
  return (
    <section className="scroll-reveal relative z-0 -mt-[60px] pt-32 pb-20 lg:pt-36 lg:pb-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
            Serviços
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold italic text-brand-green">
            O que oferecemos
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="mx-auto h-14 w-14 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-green">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
