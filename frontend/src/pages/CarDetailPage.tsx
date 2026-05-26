import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  Gauge,
  Fuel,
  Calendar,
  Palette,
  MessageCircle,
  Send,
  Check,
  FileText,
  Edit,
  Trash2,
  CheckCircle2,
  Settings,
  User,
  ShieldAlert,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { Footer } from "@/components/landing/Footer";

// Mocks correspondentes aos IDs do estoque e alguns extras para o perfil
interface MockCar {
  id: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  km: string;
  fuel: string;
  color: string;
  plate: string;
  status: "DISPONIVEL" | "VENDIDO";
  description: string;
  images: string[];
  fipe: string;
  gearbox: string;
}

const mockCars: Record<string, MockCar> = {
  "1": {
    id: "1",
    brand: "VOLKSWAGEN",
    model: "Polo 2023",
    year: "2022/2023",
    price: "R$ 89.900",
    km: "32.000 km",
    fuel: "Flex",
    color: "Cinza Platinum",
    plate: "PHG-9G24",
    status: "DISPONIVEL",
    description: "Excelente oportunidade! Polo com baixa quilometragem, único dono e todas as revisões periódicas carimbadas na concessionária autorizada VW. Modelo conta com motor Turbo 170 TSI econômico e ágil, painel 100% digital, central multimídia VW Play com espelhamento sem fio de Apple CarPlay e Android Auto, faróis em LED, sensores de estacionamento e laudo cautelar 100% aprovado.",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600"
    ],
    fipe: "R$ 86.400",
    gearbox: "Automático"
  },
  "2": {
    id: "2",
    brand: "FIAT",
    model: "Argo 2022",
    year: "2021/2022",
    price: "R$ 74.500",
    km: "41.500 km",
    fuel: "Flex",
    color: "Branco Banchisa",
    plate: "OAD-8F32",
    status: "DISPONIVEL",
    description: "Veículo extremamente econômico, ideal para o dia a dia. Central multimídia Uconnect com tela touch, comandos no volante, vidros elétricos nas 4 portas, retrovisores elétricos, rodas de liga leve originais e pneus novos. Higienizado e revisado recentemente, com garantia de motor e câmbio.",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600"
    ],
    fipe: "R$ 71.900",
    gearbox: "Manual"
  },
  "3": {
    id: "3",
    brand: "JEEP",
    model: "Renegade 2021",
    year: "2020/2021",
    price: "R$ 112.900",
    km: "58.200 km",
    fuel: "Flex",
    color: "Verde Recon",
    plate: "QNV-4E89",
    status: "DISPONIVEL",
    description: "Versão Longitude de altíssima presença. Bancos em couro premium, ar-condicionado digital dual zone, freio de estacionamento eletrônico, piloto automático, rodas aro 18 originais, câmera de ré e sensores. Laudo aprovado sem apontamentos, histórico de manutenção excelente. Toda a robustez e conforto de um legítimo Jeep.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600"
    ],
    fipe: "R$ 108.200",
    gearbox: "Automático"
  }
};

const defaultCar: MockCar = {
  id: "default",
  brand: "TOYOTA",
  model: "Corolla XEi 2022",
  year: "2021/2022",
  price: "R$ 135.000",
  km: "47.800 km",
  fuel: "Flex",
  color: "Prata Névoa",
  plate: "RXY-3D87",
  status: "DISPONIVEL",
  description: "Referência absoluta em conforto, robustez e revenda. O Corolla XEi oferece o equilíbrio perfeito com motor 2.0 Dynamic Force, transmissão Direct Shift CVT de 10 marchas simulações, pacote completo de segurança Toyota Safety Sense (alerta de colisão, frenagem autônoma, piloto automático adaptativo, farol alto automático), bancos de couro legítimo, central multimídia de última geração e revisões na concessionária.",
  images: [
    "https://images.unsplash.com/photo-1621007947382-cc34a621113e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600"
  ],
  fipe: "R$ 129.500",
  gearbox: "CVT 10m"
};

interface MaintenanceRecord {
  date: string;
  item: string;
  type: "Preventiva" | "Corretiva";
  km: string;
}

const mockMaintenanceHistory: MaintenanceRecord[] = [
  { date: "13/04/2026", item: "Lavagem Completa (Higienização Interna, Limpeza Motor, Remoção Insulfilm) - Prep. Venda", type: "Corretiva", km: "82.318 km" },
  { date: "13/04/2026", item: "Descontaminação de Pintura + Polimento Técnico", type: "Corretiva", km: "82.318 km" },
  { date: "13/04/2026", item: "Funilaria & Pintura (Recuperação da porta dianteira esquerda)", type: "Corretiva", km: "82.318 km" },
  { date: "04/04/2026", item: "Revisão Geral de Motor (Correia Poly V, Correia Direção, Tensor Dentada)", type: "Preventiva", km: "82.318 km" },
  { date: "04/04/2026", item: "Substituição de Cabos e Velas de Ignição", type: "Preventiva", km: "82.318 km" },
  { date: "04/04/2026", item: "Troca de Óleo Motor (Lubrificante 5W30) e Filtros (Óleo, Combustível, Ar)", type: "Preventiva", km: "82.318 km" },
  { date: "04/04/2026", item: "Limpeza de Bicos Injetores + Descarbonização de TBI", type: "Preventiva", km: "82.318 km" },
  { date: "04/04/2026", item: "Alinhamento 3D + Balanceamento de Rodas + Regulagem Cabo Embreagem", type: "Preventiva", km: "82.318 km" },
  { date: "20/03/2026", item: "Substituição da Bomba de Combustível", type: "Preventiva", km: "77.011 km" },
  { date: "20/03/2026", item: "Substituição do Braço / Barra Axial e Terminais de Direção", type: "Preventiva", km: "77.011 km" },
  { date: "20/03/2026", item: "Substituição das Pastilhas de Freio + Sangria de Freio", type: "Preventiva", km: "77.011 km" },
  { date: "09/02/2026", item: "Aditivo Sintético do Radiador + Substituição do Fluido de Freio DOT 4", type: "Preventiva", km: "70.373 km" },
  { date: "30/12/2025", item: "Reparo Preventivo no Sistema de Injeção Eletrônica", type: "Preventiva", km: "61.638 km" },
  { date: "27/12/2025", item: "Substituição de Pneus (Jogo Traseiro) + Alinhamento 3D + Balanceamento", type: "Preventiva", km: "60.813 km" },
  { date: "11/12/2025", item: "Substituição do Cubo de Rolamento Dianteiro Esquerdo", type: "Preventiva", km: "57.306 km" },
  { date: "10/11/2025", item: "Substituição Emergencial de Pneu Dianteiro Direito (Furo na via)", type: "Corretiva", km: "51.119 km" },
  { date: "15/05/2025", item: "Revisão Geral e Preventiva Programada — 30.000 KM (Concessionária)", type: "Preventiva", km: "30.568 km" },
  { date: "20/02/2025", item: "Revisão Geral e Preventiva Programada — 20.000 KM (Concessionária)", type: "Preventiva", km: "19.198 km" },
  { date: "09/01/2025", item: "Revisão Geral e Preventiva Programada — 10.000 KM (Concessionária)", type: "Preventiva", km: "9.745 km" }
];

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados locais para simular e editar dados
  const [car, setCar] = useState<MockCar>(defaultCar);
  const [activeImage, setActiveImage] = useState<string>("");
  const [role, setRole] = useState<"client" | "partner" | "admin">("client");
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadForm, setLeadForm] = useState({ nome: "", whatsapp: "", mensagem: "" });
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  // Carrega o veículo correto com base no ID
  useEffect(() => {
    if (id && mockCars[id]) {
      setCar(mockCars[id]);
      setActiveImage(mockCars[id].images[0]);
    } else {
      setCar(defaultCar);
      setActiveImage(defaultCar.images[0]);
    }
  }, [id]);

  // Ações do Administrador
  const handleToggleStatus = () => {
    setCar((prev) => {
      const nextStatus = prev.status === "DISPONIVEL" ? "VENDIDO" : "DISPONIVEL";
      toast.success(
        nextStatus === "VENDIDO" 
          ? "Veículo marcado como VENDIDO! Ele aparecerá na área de vendidos."
          : "Veículo marcado como DISPONÍVEL no estoque!"
      );
      return { ...prev, status: nextStatus };
    });
  };

  const handleSimulateDelete = () => {
    toast.error("Soft delete simulado! O veículo recebeu deleted_at = NOW() (RN003).", {
      description: "Em produção, este veículo sairá da listagem pública."
    });
  };

  const handleSimulateEdit = () => {
    toast.info("Interface de edição aberta (exclusivo para Administrador).");
  };

  const handleDownloadPDF = () => {
    toast.success("Histórico de manutenção baixado com sucesso!", {
      description: `Laudo técnico do veículo Placa: ${car.plate} gerado.`
    });
  };

  // Formulário de Leads
  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLeadForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.nome || !leadForm.whatsapp) {
      toast.error("Por favor, preencha seu Nome e WhatsApp.");
      return;
    }
    setLeadLoading(true);
    setTimeout(() => {
      setLeadLoading(false);
      setLeadSuccess(true);
      toast.success("Mensagem enviada com sucesso! Um vendedor responderá em breve.");
      console.log("Lead criado (RN001):", { carId: car.id, ...leadForm });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      
      {/* 1. Header Fixo Superior */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm h-20 flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Amazon Veículos" className="h-12 w-auto" />
          </Link>
          <Button 
            variant="outline" 
            className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-bold gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para a Home
          </Button>
        </div>
      </header>

      {/* 2. Barra de Controle do Administrador (Exclusiva - Admin) */}
      {role === "admin" && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 py-3 shadow-inner">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
              <p className="text-sm font-bold flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                Painel do Administrador (RN005 - Tabela FIPE: <span className="underline">{car.fipe}</span>)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleSimulateEdit}
                className="bg-white border-amber-300 text-amber-800 hover:bg-amber-100 font-bold gap-1 cursor-pointer"
              >
                <Edit className="h-3.5 w-3.5" /> Editar
              </Button>
              <Button 
                size="sm" 
                onClick={handleToggleStatus}
                className={`font-bold gap-1 cursor-pointer text-white ${
                  car.status === "DISPONIVEL" 
                    ? "bg-brand-green hover:bg-brand-green/90" 
                    : "bg-brand-red hover:bg-brand-red/90"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {car.status === "DISPONIVEL" ? "Marcar como Vendido" : "Marcar Disponível"}
              </Button>
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={handleSimulateDelete}
                className="font-bold gap-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="h-3.5 w-3.5" /> Soft Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Área do Conteúdo Principal */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 pb-16">
        
        {/* Breadcrumb Navegação */}
        <nav className="mb-6 flex items-center text-sm text-slate-500 gap-1.5 font-medium">
          <Link to="/" className="hover:text-brand-green transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Estoque</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{car.brand} {car.model}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LADO ESQUERDO: Mídia & Detalhes (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Galeria de Fotos */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-4">
              <div className="relative aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden shadow-inner">
                {car.status === "VENDIDO" && (
                  <div className="absolute top-4 left-4 z-20 bg-brand-red text-white text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-wider shadow">
                    Vendido
                  </div>
                )}
                <img 
                  src={activeImage} 
                  alt={car.model} 
                  className="w-full h-full object-cover transition-all duration-700" 
                />
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {car.images.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative aspect-[16/10] w-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImage === imgUrl ? "border-brand-red scale-95 shadow" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Ficha Técnica / Chips Grid */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                Ficha Técnica
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="bg-slate-50 border border-slate-100 hover:border-slate-200 p-4 rounded-xl flex flex-col items-start gap-2.5 transition-colors shadow-sm text-left">
                  <div className="h-9 w-9 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Gauge className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1.5">KM Rodados</span>
                    <span className="text-sm font-black text-slate-800">{car.km}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 hover:border-slate-200 p-4 rounded-xl flex flex-col items-start gap-2.5 transition-colors shadow-sm text-left">
                  <div className="h-9 w-9 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1.5">Ano</span>
                    <span className="text-sm font-black text-slate-800">{car.year}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 hover:border-slate-200 p-4 rounded-xl flex flex-col items-start gap-2.5 transition-colors shadow-sm text-left">
                  <div className="h-9 w-9 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Fuel className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1.5">Combustível</span>
                    <span className="text-sm font-black text-slate-800">{car.fuel}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 hover:border-slate-200 p-4 rounded-xl flex flex-col items-start gap-2.5 transition-colors shadow-sm text-left">
                  <div className="h-9 w-9 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Palette className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1.5">Cor</span>
                    <span className="text-sm font-black text-slate-800">{car.color}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Descrição do Veículo */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                Descrição do Veículo
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                {car.description}
              </p>
            </div>

            {/* Histórico de Manutenções (Exclusivo para Parceiro e Admin - RN004) */}
            {(role === "partner" || role === "admin") && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-left">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-green animate-pulse shrink-0"></span>
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                        Histórico de Manutenções do Veículo
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Relatório técnico detalhado de todas as intervenções preventivas e corretivas efetuadas.
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={handleDownloadPDF}
                    className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-bold text-xs gap-2 h-9 px-4 cursor-pointer shadow-sm"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Exportar PDF
                  </Button>
                </div>

                {/* Timeline container */}
                <div className="relative">
                  <div 
                    className={`space-y-5 overflow-hidden transition-all duration-500 ease-in-out relative ${
                      isHistoryExpanded ? "max-h-[3000px]" : "max-h-[340px]"
                    }`}
                  >
                    {/* Vertical timeline line */}
                    <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-slate-100"></div>

                    {mockMaintenanceHistory.map((record, index) => (
                      <div key={index} className="relative flex items-start gap-4 text-left">
                        {/* Bullet point */}
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 z-10 border-2 bg-white font-black text-[9px] tracking-tighter shadow-sm ${
                          record.type === "Preventiva" 
                            ? "border-emerald-500 text-emerald-600" 
                            : "border-amber-500 text-amber-600"
                        }`}>
                          {record.type === "Preventiva" ? "PREV" : "CORR"}
                        </div>

                        {/* Content */}
                        <div className="flex-grow pt-1.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                            <span className="text-xs font-bold text-slate-800 leading-snug">{record.item}</span>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0 self-start sm:self-center">
                              {record.km}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[10px] font-bold">
                            <span className="text-slate-400">{record.date}</span>
                            <span className="text-slate-300 font-normal">•</span>
                            <span className={record.type === "Preventiva" ? "text-emerald-600" : "text-amber-600"}>
                              Serviço {record.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gradient Fade & Expand Button */}
                  {!isHistoryExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-20"></div>
                  )}

                  <div className="mt-6 text-center relative z-30">
                    <Button
                      onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                      variant="outline"
                      className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-bold text-xs h-9 px-6 rounded-lg shadow-sm cursor-pointer"
                    >
                      {isHistoryExpanded ? "Ver Menos" : "Ver Histórico Completo"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* LADO DIREITO: Preço, Conversão, Leads & Acesso Seguro (Col 5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Bloco de Preço & Título */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-left">
              <span className="inline-block bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                {car.brand}
              </span>
              <h1 className="text-3xl font-extrabold italic text-brand-green tracking-tight leading-none">
                {car.model}
              </h1>
              
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 tracking-tight">{car.price}</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">À Vista</span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Revisado com Garantia de Procedência
              </div>
            </div>

            {/* Exclusivo: Área do Parceiro/Admin (RN004 - Exibe Placa e Manutenção) */}
            {(role === "partner" || role === "admin") && (
              <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-6 text-left shadow-sm">
                <span className="inline-flex items-center gap-1 bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  <ShieldCheck className="h-3.5 w-3.5" /> Acesso Exclusivo
                </span>
                
                <h4 className="text-md font-bold text-brand-green mb-3">Dados Internos do Veículo</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3.5 rounded-xl border border-brand-green/10">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest">Placa do Veículo</span>
                    <span className="text-lg font-black tracking-wider text-slate-800">{car.plate}</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-brand-green/10">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest">Transmissão</span>
                    <span className="text-md font-bold text-slate-800">{car.gearbox}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card de Conversão & Leads */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-left">
              {leadSuccess ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                    <Check className="h-7 w-7 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Contato Enviado!</h3>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Obrigado, <strong className="text-brand-red">{leadForm.nome}</strong>! Sua dúvida sobre o <strong>{car.model}</strong> foi registrada. Em breve entraremos em contato pelo WhatsApp.
                  </p>
                  <Button
                    onClick={() => {
                      setLeadSuccess(false);
                      setLeadForm({ nome: "", whatsapp: "", mensagem: "" });
                    }}
                    className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold h-10 px-5 rounded-lg cursor-pointer"
                  >
                    Enviar outra dúvida
                  </Button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Dúvidas sobre o veículo?</h3>
                    <p className="text-xs text-slate-400 mt-1">Preencha o formulário para receber uma proposta.</p>
                  </div>

                  <form onSubmit={leadSubmitHandler => handleLeadSubmit(leadSubmitHandler)} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="nome" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        value={leadForm.nome}
                        onChange={handleLeadChange}
                        placeholder="Ex: Pedro Alencar"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition text-sm bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="whatsapp" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        value={leadForm.whatsapp}
                        onChange={handleLeadChange}
                        placeholder="Ex: (92) 98888-8888"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition text-sm bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="mensagem" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                        Mensagem (Opcional)
                      </label>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        rows={2}
                        value={leadForm.mensagem}
                        onChange={handleLeadChange}
                        placeholder={`Tenho interesse neste ${car.model}. Gostaria de mais detalhes...`}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition text-sm bg-slate-50/50 resize-none"
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      disabled={leadLoading}
                      className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold h-11 rounded-lg cursor-pointer shadow flex items-center justify-center gap-2"
                    >
                      {leadLoading ? (
                        <span className="flex items-center gap-1.5">
                          <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Enviando...
                        </span>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          Tenho Interesse
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">ou</span>
                    <div className="flex-grow border-t border-slate-100"></div>
                  </div>

                  <Button
                    onClick={() => {
                      const msg = encodeURIComponent(`Olá, tenho interesse no veículo ${car.brand} ${car.model} ano ${car.year} de ${car.price} do estoque.`);
                      window.open(`https://wa.me/5592984868379?text=${msg}`, "_blank");
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-lg cursor-pointer shadow flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chamar no WhatsApp
                  </Button>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* 4. UTILIÁRIO EXCLUSIVO: Seletor de Papéis (Role Switcher) Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl p-4 w-72 transition-all duration-300">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3">
            <Settings className="h-4 w-4 text-brand-red animate-spin-slow" />
            <h5 className="text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> Seletor de Papéis (Simulador)
            </h5>
          </div>
          <p className="text-[10px] text-slate-400 mb-3 text-left leading-relaxed">
            Mude o papel abaixo para ver como a página exibe dados progressivamente de forma dinâmica (RN004):
          </p>
          <div className="flex flex-col gap-2">
            
            <button
              onClick={() => {
                setRole("client");
                toast.success("Visualização alterada para: CLIENTE (Público)", { duration: 1500 });
              }}
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-between border cursor-pointer transition-all ${
                role === "client" 
                  ? "bg-white/10 border-white text-white shadow-md font-extrabold" 
                  : "bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Cliente Anônimo
              </span>
              {role === "client" && <span className="h-1.5 w-1.5 rounded-full bg-brand-red"></span>}
            </button>
 
            <button
              onClick={() => {
                setRole("partner");
                toast.success("Visualização alterada para: PARCEIRO (Logado)", { duration: 1500 });
              }}
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-between border cursor-pointer transition-all ${
                role === "partner" 
                  ? "bg-white/10 border-white text-white shadow-md font-extrabold" 
                  : "bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Parceiro Conveniado
              </span>
              {role === "partner" && <span className="h-1.5 w-1.5 rounded-full bg-brand-green"></span>}
            </button>
 
            <button
              onClick={() => {
                setRole("admin");
                toast.success("Visualização alterada para: ADMINISTRADOR", { duration: 1500 });
              }}
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-between border cursor-pointer transition-all ${
                role === "admin" 
                  ? "bg-white/10 border-white text-white shadow-md font-extrabold" 
                  : "bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5" /> Administrador
              </span>
              {role === "admin" && <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>}
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
