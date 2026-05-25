import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const navItems = ["Estoque", "Vendidos", "Seja Parceiro"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white text-brand-green transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src={logo} alt="Locadora Amazon Veículos" className="h-12 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm font-semibold text-brand-green/80 hover:text-brand-green transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-brand-green bg-transparent text-brand-green hover:bg-brand-green hover:text-white font-bold"
          >
            Entrar
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-brand-green"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 py-3 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm font-semibold text-brand-green"
            >
              {item}
            </a>
          ))}
          <Button
            variant="outline"
            className="border-brand-green bg-transparent text-brand-green hover:bg-brand-green hover:text-white font-bold w-full"
          >
            Entrar
          </Button>
        </div>
      )}
    </header>
  );
}
