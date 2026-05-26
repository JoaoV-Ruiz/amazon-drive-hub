import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ChevronLeft,
  Search,
  SlidersHorizontal,
  MessageCircle,
  Gauge,
  Calendar,
  Fuel,
  RotateCcw,
  X,
  Settings,
  ArrowUpDown,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import { Footer } from "@/components/landing/Footer";

// Interface para os veículos do estoque
interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  price: number;
  priceFormatted: string;
  km: number;
  kmFormatted: string;
  fuel: string;
  color: string;
  gearbox: string;
  image: string;
  status: "DISPONIVEL" | "VENDIDO";
}

// Banco de dados simulado expandido com 8 carros diversos
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    brand: "VOLKSWAGEN",
    model: "Polo 170 TSI 2023",
    year: "2022/2023",
    price: 89900,
    priceFormatted: "R$ 89.900",
    km: 32000,
    kmFormatted: "32.000 km",
    fuel: "Flex",
    color: "Cinza Platinum",
    gearbox: "Automático",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
    status: "DISPONIVEL"
  },
  {
    id: "2",
    brand: "FIAT",
    model: "Argo Drive 1.0 2022",
    year: "2021/2022",
    price: 74500,
    priceFormatted: "R$ 74.500",
    km: 41500,
    kmFormatted: "41.500 km",
    fuel: "Flex",
    color: "Branco Banchisa",
    gearbox: "Manual",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600",
    status: "DISPONIVEL"
  },
  {
    id: "3",
    brand: "JEEP",
    model: "Renegade Longitude 2021",
    year: "2020/2021",
    price: 112900,
    priceFormatted: "R$ 112.900",
    km: 58200,
    kmFormatted: "58.200 km",
    fuel: "Flex",
    color: "Verde Recon",
    gearbox: "Automático",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    status: "DISPONIVEL"
  },
  {
    id: "4",
    brand: "HYUNDAI",
    model: "HB20 Comfort 2023",
    year: "2022/2023",
    price: 82300,
    priceFormatted: "R$ 82.300",
    km: 22000,
    kmFormatted: "22.000 km",
    fuel: "Flex",
    color: "Prata Metal",
    gearbox: "Manual",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    status: "DISPONIVEL"
  },
  {
    id: "5",
    brand: "TOYOTA",
    model: "Corolla XEi 2.0 2022",
    year: "2021/2022",
    price: 135000,
    priceFormatted: "R$ 135.000",
    km: 47800,
    kmFormatted: "47.800 km",
    fuel: "Flex",
    color: "Prata Névoa",
    gearbox: "CVT 10m",
    image: "https://images.unsplash.com/photo-1621007947382-cc34a621113e?auto=format&fit=crop&q=80&w=600",
    status: "DISPONIVEL"
  },
  {
    id: "6",
    brand: "CHEVROLET",
    model: "Onix Premier Turbo 2023",
    year: "2022/2023",
    price: 79900,
    priceFormatted: "R$ 79.900",
    km: 29000,
    kmFormatted: "29.000 km",
    fuel: "Flex",
    color: "Vermelho Carmim",
    gearbox: "Automático",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600",
    status: "DISPONIVEL"
  },
  {
    id: "7",
    brand: "VOLKSWAGEN",
    model: "Jetta GLI 350 TSI 2021",
    year: "2020/2021",
    price: 189900,
    priceFormatted: "R$ 189.900",
    km: 51000,
    kmFormatted: "51.000 km",
    fuel: "Gasolina",
    color: "Cinza Puro",
    gearbox: "Automático",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600",
    status: "DISPONIVEL"
  },
  {
    id: "8",
    brand: "HONDA",
    model: "Civic Touring Turbo 2020",
    year: "2019/2020",
    price: 124900,
    priceFormatted: "R$ 124.900",
    km: 62000,
    kmFormatted: "62.000 km",
    fuel: "Gasolina",
    color: "Preto Cristal",
    gearbox: "CVT",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    status: "DISPONIVEL"
  }
];

// Lista de marcas para filtro rápido
const brandsList = ["VOLKSWAGEN", "FIAT", "JEEP", "HYUNDAI", "TOYOTA", "CHEVROLET", "HONDA"];

// Formatador auxiliar de moeda BRL
const formatPrice = (val: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  }).format(val);
};

export default function StockPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [maxKm, setMaxKm] = useState("");

  // Estado da ordenação
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "km-asc" | "year-desc">("price-asc");

  // Filtros Mobile Drawer
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sincronizar parâmetros de busca na URL com o estado local dos filtros
  useEffect(() => {
    const searchParam = searchParams.get("search");
    const brandParam = searchParams.get("brand");
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    if (brandParam) {
      setSelectedBrand(brandParam.toUpperCase());
    }
  }, [searchParams]);

  // Ação de limpar filtros
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
    setMaxPrice(5000000);
    setMinYear("");
    setMaxYear("");
    setTransmission("");
    setFuel("");
    setMaxKm("");
  };

  // Verifica se o fallback da marca foi aplicado (quando o carro específico não existe em estoque)
  const isFallbackApplied = useMemo(() => {
    if (!selectedBrand || !searchTerm) return false;
    
    // Filtro por marca
    const brandFiltered = mockVehicles.filter((v) => v.brand === selectedBrand);
    
    // Filtro por termo
    const term = searchTerm.toLowerCase();
    const searchFiltered = brandFiltered.filter(
      (v) => v.model.toLowerCase().includes(term) || v.brand.toLowerCase().includes(term)
    );
    
    return searchFiltered.length === 0 && brandFiltered.length > 0;
  }, [searchTerm, selectedBrand]);

  // Filtragem e Ordenação dinâmica dos veículos em tempo real
  const filteredVehicles = useMemo(() => {
    // 1. Filtrar por Marca primeiro para permitir fallback
    let brandFiltered = [...mockVehicles];
    if (selectedBrand) {
      brandFiltered = brandFiltered.filter((v) => v.brand === selectedBrand);
    }

    // 2. Filtrar por Busca Livre a partir do filtro de marca (ou geral)
    let searchFiltered = [...brandFiltered];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      searchFiltered = searchFiltered.filter(
        (v) => 
          v.model.toLowerCase().includes(term) || 
          v.brand.toLowerCase().includes(term)
      );
    }

    // 3. Lógica de Fallback: Se a busca específica (modelo) não retornar resultados,
    // mas uma marca e termo de busca foram fornecidos, mantemos todos os veículos da marca.
    let result = searchFiltered;
    if (searchFiltered.length === 0 && selectedBrand && searchTerm) {
      result = brandFiltered;
    }


    // Câmbio
    if (transmission) {
      if (transmission === "MANUAL") {
        result = result.filter((v) => v.gearbox === "Manual");
      } else if (transmission === "AUTOMATICO") {
        result = result.filter((v) => v.gearbox === "Automático" || v.gearbox.includes("CVT"));
      }
    }

    // Combustível
    if (fuel) {
      result = result.filter((v) => v.fuel.toLowerCase() === fuel.toLowerCase());
    }

    // Preço Máximo (Slider até 5 Milhões)
    if (maxPrice) {
      result = result.filter((v) => v.price <= maxPrice);
    }

    // Ano Mínimo
    if (minYear) {
      result = result.filter((v) => {
        const parts = v.year.split("/");
        const year = parseInt(parts[0]);
        return year >= parseInt(minYear);
      });
    }

    // Ano Máximo
    if (maxYear) {
      result = result.filter((v) => {
        const parts = v.year.split("/");
        const year = parseInt(parts[1] || parts[0]);
        return year <= parseInt(maxYear);
      });
    }

    // KM Máximo
    if (maxKm) {
      result = result.filter((v) => v.km <= parseInt(maxKm));
    }

    // Ordenação
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "km-asc") {
      result.sort((a, b) => a.km - b.km);
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => {
        const yearA = parseInt(a.year.split("/")[0]);
        const yearB = parseInt(b.year.split("/")[0]);
        return yearB - yearA;
      });
    }

    return result;
  }, [searchTerm, selectedBrand, transmission, fuel, maxPrice, minYear, maxYear, maxKm, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      
      {/* 1. Header Superior Fixo */}
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

      {/* 2. Área do Conteúdo Principal */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 pb-16 w-full flex-grow">
        
        {/* Breadcrumb Navegação */}
        <nav className="mb-6 flex items-center text-sm text-slate-500 gap-1.5 font-medium text-left">
          <Link to="/" className="hover:text-brand-green transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Estoque</span>
        </nav>

        {/* Layout Split: Filtros (3 colunas) + Grid (9 colunas) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA (DESKTOP FILTROS) — 3 colunas */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-md">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-brand-green" />
                  Filtros
                </h3>
                <button 
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-brand-red flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" /> Limpar
                </button>
              </div>

              {/* Filtro: Busca Livre */}
              <div className="space-y-2 mb-5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Busca por Modelo</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ex: Polo, Corolla..."
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition bg-slate-50"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Filtro: Marca */}
              <div className="space-y-2 mb-5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-brand-red outline-none bg-slate-50"
                >
                  <option value="">Todas as Marcas</option>
                  {brandsList.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Filtro: Faixa de Preço */}
              <div className="space-y-2 mb-5 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Preço Máximo</label>
                  <span className="text-xs font-black text-brand-green">
                    {maxPrice === 5000000 ? "Qualquer Preço" : formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer focus:outline-none transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-red [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-red [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-125"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>R$ 0</span>
                  <span>R$ 5 Mi</span>
                </div>
              </div>

              {/* Filtro: Ano */}
              <div className="space-y-2 mb-5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ano de Fabricação</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={minYear}
                    onChange={(e) => setMinYear(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-lg border border-slate-200 focus:border-brand-red outline-none bg-slate-50"
                  >
                    <option value="">Mín</option>
                    {["2018", "2019", "2020", "2021", "2022", "2023"].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <select
                    value={maxYear}
                    onChange={(e) => setMaxYear(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-lg border border-slate-200 focus:border-brand-red outline-none bg-slate-50"
                  >
                    <option value="">Máx</option>
                    {["2018", "2019", "2020", "2021", "2022", "2023"].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtro: Câmbio */}
              <div className="space-y-2 mb-5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transmissão</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTransmission(transmission === "MANUAL" ? "" : "MANUAL")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      transmission === "MANUAL" 
                        ? "bg-brand-green border-brand-green text-white shadow-sm" 
                        : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    Manual
                  </button>
                  <button
                    onClick={() => setTransmission(transmission === "AUTOMATICO" ? "" : "AUTOMATICO")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      transmission === "AUTOMATICO" 
                        ? "bg-brand-green border-brand-green text-white shadow-sm" 
                        : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    Automático
                  </button>
                </div>
              </div>

              {/* Filtro: Combustível */}
              <div className="space-y-2 mb-5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Combustível</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFuel(fuel === "FLEX" ? "" : "FLEX")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      fuel === "FLEX" 
                        ? "bg-brand-green border-brand-green text-white shadow-sm" 
                        : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    Flex
                  </button>
                  <button
                    onClick={() => setFuel(fuel === "GASOLINA" ? "" : "GASOLINA")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      fuel === "GASOLINA" 
                        ? "bg-brand-green border-brand-green text-white shadow-sm" 
                        : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    Gasolina
                  </button>
                </div>
              </div>

              {/* Filtro: Quilometragem */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">KM Máximo</label>
                <input
                  type="number"
                  value={maxKm}
                  onChange={(e) => setMaxKm(e.target.value)}
                  placeholder="Ex: 50000"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-brand-red outline-none bg-slate-50"
                />
              </div>

            </div>
          </aside>

          {/* COLUNA DIREITA (GRID DE RESULTADOS) — 9 colunas */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Barra de Filtros Mobile & Controles de Ordenação */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4 text-left">
              <div>
                <span className="text-sm text-slate-500 font-bold">
                  {filteredVehicles.length} {filteredVehicles.length === 1 ? "veículo encontrado" : "veículos encontrados"}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Botão para ativar filtros no Mobile */}
                <Button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xs gap-1.5 h-10 rounded-lg cursor-pointer flex items-center justify-center"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filtrar
                </Button>

                {/* Seletor de Ordenação */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-brand-red outline-none bg-slate-50 font-bold text-slate-700"
                  >
                    <option value="price-asc">Menor Preço</option>
                    <option value="price-desc">Maior Preço</option>
                    <option value="km-asc">Menor KM</option>
                    <option value="year-desc">Ano mais novo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Aviso de Fallback da Marca se aplicável */}
            {isFallbackApplied && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-sm font-medium flex items-center gap-3 shadow-sm transition-all duration-300">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 font-bold text-base">
                  !
                </div>
                <div>
                  Não encontramos o modelo <span className="font-extrabold text-brand-red">"{searchTerm}"</span> em estoque no momento.
                  <span className="block text-xs text-slate-500 mt-0.5">
                    Exibindo todos os veículos disponíveis da marca <span className="font-bold text-slate-700">{selectedBrand}</span> como alternativa.
                  </span>
                </div>
              </div>
            )}

            {/* Grid dos Veículos */}
            {filteredVehicles.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((v) => (
                  <Card
                    key={v.id}
                    className="overflow-hidden rounded-2xl border-none shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col justify-between bg-white text-left p-0"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden shadow-inner">
                        {v.status === "VENDIDO" && (
                          <div className="absolute top-4 left-4 z-20 bg-brand-red text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow">
                            Vendido
                          </div>
                        )}
                        <img 
                          src={v.image} 
                          alt={v.model} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Header Specs */}
                      <div className="p-5 pb-0">
                        <span className="block text-[10px] font-extrabold text-brand-red uppercase tracking-widest mb-1">
                          {v.brand}
                        </span>
                        <h3 className="font-extrabold text-lg text-brand-green italic leading-tight tracking-tight">
                          {v.model}
                        </h3>

                        {/* Chips Grid de Specs do Veículo */}
                        <div className="mt-4 grid grid-cols-2 gap-2 text-slate-500 font-semibold text-[11px]">
                          <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-1.5 border border-slate-100">
                            <Gauge className="h-3.5 w-3.5 text-brand-green shrink-0" />
                            <span>{v.kmFormatted}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-1.5 border border-slate-100">
                            <Calendar className="h-3.5 w-3.5 text-brand-green shrink-0" />
                            <span>{v.year}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-1.5 border border-slate-100">
                            <Fuel className="h-3.5 w-3.5 text-brand-green shrink-0" />
                            <span>{v.fuel}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-1.5 border border-slate-100">
                            <Settings className="h-3.5 w-3.5 text-brand-green shrink-0" />
                            <span>{v.gearbox}</span>
                          </div>
                        </div>

                        {/* Price Tag */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900 tracking-tight">{v.priceFormatted}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">À Vista</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action buttons */}
                    <div className="p-5 pt-4">
                      <div className="flex gap-2">
                        <Link to={`/carro/${v.id}`} className="flex-grow flex">
                          <Button
                            variant="outline"
                            className="w-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-bold text-xs h-10 rounded-xl cursor-pointer"
                          >
                            Ver detalhes
                          </Button>
                        </Link>
                        <Button
                          onClick={() => {
                            const msg = encodeURIComponent(`Olá, vi o veículo ${v.brand} ${v.model} no estoque por ${v.priceFormatted} e gostaria de mais informações.`);
                            window.open(`https://wa.me/5592984868379?text=${msg}`, "_blank");
                          }}
                          size="icon"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white h-10 w-10 rounded-xl cursor-pointer shrink-0"
                          aria-label="WhatsApp"
                        >
                          <MessageCircle className="h-4.5 w-4.5 stroke-[2.5]" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="bg-white rounded-2xl p-16 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center">
                <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Nenhum veículo encontrado</h3>
                <p className="mt-2 text-sm text-slate-400 max-w-sm leading-relaxed">
                  Não encontramos nenhum veículo correspondente aos filtros selecionados. Tente redefinir alguns filtros ou limpar a pesquisa.
                </p>
                <Button
                  onClick={handleClearFilters}
                  className="mt-6 bg-brand-green hover:bg-brand-green/90 text-white font-bold h-10 px-6 rounded-xl cursor-pointer shadow-sm gap-2"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Limpar todos os filtros
                </Button>
              </div>
            )}

          </div>
        </div>

      </main>

      {/* 3. MOBILE FILTERS DRAWER (SLIDE OVER DRAWER) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop mask */}
          <div 
            onClick={() => setShowMobileFilters(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
          ></div>

          {/* Drawer card body */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              
              {/* Header drawer */}
              <div className="px-6 py-5 bg-white border-b border-slate-100 flex items-center justify-between text-left">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-brand-green" />
                  Filtros Avançados
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="rounded-md text-slate-400 hover:text-slate-500 focus:outline-none p-1.5 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filters Scrollable list */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-left">
                
                {/* Filtro: Busca Livre */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Busca por Modelo</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Ex: Polo, Corolla..."
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 outline-none bg-slate-50"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Filtro: Marca */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Marca</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 outline-none bg-slate-50"
                  >
                    <option value="">Todas as Marcas</option>
                    {brandsList.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Filtro: Preço */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Preço Máximo</label>
                    <span className="text-xs font-black text-brand-green">
                      {maxPrice === 5000000 ? "Qualquer Preço" : formatPrice(maxPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer focus:outline-none transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-red [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-red [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-125"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>R$ 0</span>
                    <span>R$ 5 Mi</span>
                  </div>
                </div>

                {/* Filtro: Ano */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ano de Fabricação</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={minYear}
                      onChange={(e) => setMinYear(e.target.value)}
                      className="w-full px-2 py-2.5 text-xs rounded-lg border border-slate-200 outline-none bg-slate-50"
                    >
                      <option value="">Mín</option>
                      {["2018", "2019", "2020", "2021", "2022", "2023"].map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <select
                      value={maxYear}
                      onChange={(e) => setMaxYear(e.target.value)}
                      className="w-full px-2 py-2.5 text-xs rounded-lg border border-slate-200 outline-none bg-slate-50"
                    >
                      <option value="">Máx</option>
                      {["2018", "2019", "2020", "2021", "2022", "2023"].map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filtro: Câmbio */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transmissão</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTransmission(transmission === "MANUAL" ? "" : "MANUAL")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                        transmission === "MANUAL" 
                          ? "bg-brand-green border-brand-green text-white shadow-sm" 
                          : "border-slate-200 text-slate-600 bg-slate-50"
                      }`}
                    >
                      Manual
                    </button>
                    <button
                      onClick={() => setTransmission(transmission === "AUTOMATICO" ? "" : "AUTOMATICO")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                        transmission === "AUTOMATICO" 
                          ? "bg-brand-green border-brand-green text-white shadow-sm" 
                          : "border-slate-200 text-slate-600 bg-slate-50"
                      }`}
                    >
                      Automático
                    </button>
                  </div>
                </div>

                {/* Filtro: Combustível */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Combustível</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFuel(fuel === "FLEX" ? "" : "FLEX")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                        fuel === "FLEX" 
                          ? "bg-brand-green border-brand-green text-white shadow-sm" 
                          : "border-slate-200 text-slate-600 bg-slate-50"
                      }`}
                    >
                      Flex
                    </button>
                    <button
                      onClick={() => setFuel(fuel === "GASOLINA" ? "" : "GASOLINA")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                        fuel === "GASOLINA" 
                          ? "bg-brand-green border-brand-green text-white shadow-sm" 
                          : "border-slate-200 text-slate-600 bg-slate-50"
                      }`}
                    >
                      Gasolina
                    </button>
                  </div>
                </div>

                {/* Filtro: Quilometragem */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">KM Máximo</label>
                  <input
                    type="number"
                    value={maxKm}
                    onChange={(e) => setMaxKm(e.target.value)}
                    placeholder="Ex: 50000"
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 outline-none bg-slate-50"
                  />
                </div>

              </div>

              {/* Bottom drawer footer buttons */}
              <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex gap-3">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-700 font-bold text-xs h-11 rounded-xl cursor-pointer bg-white"
                >
                  Limpar
                </Button>
                <Button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xs h-11 rounded-xl cursor-pointer"
                >
                  Ver Resultados ({filteredVehicles.length})
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. Footer do Rodapé */}
      <Footer />
    </div>
  );
}
