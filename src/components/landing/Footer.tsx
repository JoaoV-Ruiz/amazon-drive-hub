import { Phone, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-green text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] tracking-[0.35em] text-white/70 font-medium">
              LOCADORA
            </span>
            <span className="text-2xl font-extrabold italic tracking-tight">
              AMAZON <span className="font-light not-italic">Veículos</span>
            </span>
          </div>
          <p className="mt-4 italic text-white/80">Sua estrada começa aqui.</p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4">
            Navegação
          </h4>
          <ul className="space-y-2 text-white/85">
            {["Estoque", "Vendidos", "Parceiros", "Entrar"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-white transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4">
            Contato
          </h4>
          <ul className="space-y-3 text-white/85">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> (92) 98486-8379
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4" /> @amazonveiculos
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4" /> @amazonnveiculos
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Locadora Amazon Veículos. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
