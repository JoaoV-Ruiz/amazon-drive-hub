import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-brand-green text-white relative">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-12 gap-10">

        {/* Column 1: Logo & Socials */}
        <div className="md:col-span-5 text-left flex flex-col justify-between">
          <div>
            {/* White-filtered logo for perfect integration with the dark green background */}
            <div className="mb-5 flex items-center">
              <img src={logo} alt="Amazon Veículos" className="h-28 w-auto logo-white" />
            </div>
            <p className="text-white/80 max-w-sm text-sm leading-relaxed italic">
              Sua estrada começa aqui. Compra, venda e repasse de veículos com a confiança e transparência que você merece.
            </p>
          </div>

          {/* Social circular buttons matching the requested pattern with minimal hover */}
          <div className="mt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3.5">
              Conecte-se Conosco
            </h4>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/amazonveiculos/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-brand-green flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-105 active:scale-95 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-brand-green flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-105 active:scale-95 shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/Amazonlocadoraa"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-brand-green flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-105 active:scale-95 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>

              {/* Google Maps */}
              <a
                href="https://maps.app.goo.gl/w4HWTLNXiJaT31vt8"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-brand-green flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-105 active:scale-95 shadow-sm"
                aria-label="Google Maps"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="md:col-span-3 text-left">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-6 pb-2 border-b border-white/10">
            Navegação
          </h4>
          <ul className="space-y-3.5 text-sm text-white/80">
            {[
              { label: "Estoque de Veículos", link: "/estoque", isRouter: true },
              { label: "Serviços", link: "#servicos", isRouter: false },
              { label: "Fale Conosco", link: "#contato", isRouter: false },
            ].map((item) => (
              <li key={item.label}>
                {item.isRouter ? (
                  <Link
                    to={item.link}
                    className="hover:text-white transition-colors flex items-center gap-1.5 hover:underline"
                  >
                    <span className="h-1 w-1 bg-brand-red rounded-full"></span>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    className="hover:text-white transition-colors flex items-center gap-1.5 hover:underline"
                  >
                    <span className="h-1 w-1 bg-brand-red rounded-full"></span>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact & Hours */}
        <div className="md:col-span-4 text-left">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-6 pb-2 border-b border-white/10">
            Atendimento
          </h4>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 mt-0.5 text-brand-red shrink-0" />
              <div>
                <span className="block font-semibold text-white">Telefone / WhatsApp</span>
                <span className="text-white/70">(92) 98486-8379</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 mt-0.5 text-brand-red shrink-0" />
              <div>
                <span className="block font-semibold text-white">E-mail</span>
                <span className="text-white/70">contato@amazonveiculos.com.br</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 mt-0.5 text-brand-red shrink-0" />
              <div>
                <span className="block font-semibold text-white">Horário de Funcionamento</span>
                <span className="text-white/70">Seg a Sex: 8h às 18h | Sáb: 8h às 12h</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom copyright bar */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Amazon Veículos. Todos os direitos reservados.
          </div>
          <div>
            Desenvolvido com excelência e paixão.
          </div>
        </div>
      </div>
    </footer>
  );
}

