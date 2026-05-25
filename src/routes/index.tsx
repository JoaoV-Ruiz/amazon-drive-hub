import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Stock } from "@/components/landing/Stock";
import { Services } from "@/components/landing/Services";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Locadora Amazon Veículos — Locação, Repasse e Venda" },
      {
        name: "description",
        content:
          "Locação, repasse e venda de veículos com transparência e confiança. Sua estrada começa aqui.",
      },
      { property: "og:title", content: "Locadora Amazon Veículos" },
      {
        property: "og:description",
        content: "Locação, repasse e venda de veículos com transparência e confiança.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stock />
        <Services />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
