import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const navItems = ["Estoque", "Vendidos", "Seja Parceiro"];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-brand-green text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex flex-col leading-none">
          <span className="text-[10px] tracking-[0.35em] text-white/70 font-medium">
            LOCADORA
          </span>
          <span className="text-xl font-extrabold italic tracking-tight">
            AMAZON <span className="font-light not-italic">Veículos</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm font-medium text-white/85 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-white/70 bg-transparent text-white hover:bg-white hover:text-brand-green font-bold"
          >
            Entrar
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-brand-green border-t border-white/10 px-4 py-3 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm text-white/85"
            >
              {item}
            </a>
          ))}
          <Button
            variant="outline"
            className="border-white/70 bg-transparent text-white hover:bg-white hover:text-brand-green font-bold w-full"
          >
            Entrar
          </Button>
        </div>
      )}
    </header>
  );
}
