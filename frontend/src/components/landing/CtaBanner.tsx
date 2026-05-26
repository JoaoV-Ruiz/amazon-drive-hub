import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Check, Send, Sparkles, Clock, ShieldCheck, UserCheck } from "lucide-react";
import { toast } from "sonner";

export function CtaBanner() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    interesse: "compra",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.whatsapp) {
      toast.error("Por favor, preencha seu Nome e WhatsApp.");
      return;
    }

    setLoading(true);

    // Simulate lead generation
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Lead gerado com sucesso! Nossa equipe entrará em contato.");
      console.log("Lead gerado:", formData);
    }, 1200);
  };

  return (
    <section id="contato" className="relative overflow-hidden bg-gradient-to-br from-brand-red via-brand-red to-red-950 text-white py-20 lg:py-24">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: CTA Info */}
          <div className="lg:col-span-5 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 uppercase tracking-wider mb-6">
              <Sparkles className="h-3 w-3 text-white" /> Fale Conosco
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold italic leading-tight tracking-tight">
              Gostou de algum veículo <br className="hidden sm:inline" />
              <span className="text-white/90">ou tem alguma dúvida?</span>
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl">
              Nossa equipe de especialistas está pronta para te ajudar a conquistar o seu próximo carro. Preencha os dados e entraremos em contato com todos os detalhes!
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Retorno rápido</h4>
                  <p className="text-sm text-white/70">Respondemos em menos de 1 hora no seu WhatsApp.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Segurança de Dados</h4>
                  <p className="text-sm text-white/70">Suas informações estão 100% protegidas e criptografadas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Atendimento Exclusivo</h4>
                  <p className="text-sm text-white/70">Consultores dedicados a encontrar as melhores propostas e taxas.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs text-white/60 mb-3">Prefere atendimento direto?</p>
              <Button
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white hover:text-brand-red font-bold transition-all gap-2"
                onClick={() => window.open("https://wa.me/5592999999999", "_blank")}
              >
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </Button>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-xl bg-white text-slate-900 rounded-2xl shadow-2xl p-8 border border-white/10 transition-all duration-300">
              {success ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Contato enviado!</h3>
                  <p className="mt-4 text-slate-600 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-brand-red">{formData.nome}</strong>! Nossa equipe de vendas já recebeu sua mensagem e entrará em contato pelo WhatsApp <strong>{formData.whatsapp}</strong> em breve.
                  </p>
                  <Button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({ nome: "", whatsapp: "", email: "", interesse: "compra", mensagem: "" });
                    }}
                    className="mt-8 bg-brand-green hover:bg-brand-green/90 text-white font-bold h-11 px-6 rounded-lg cursor-pointer"
                  >
                    Enviar nova dúvida
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-left mb-6 border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-800">Preencha seus dados</h3>
                    <p className="text-sm text-slate-500 mt-1">Nossa equipe falará com você no WhatsApp.</p>
                  </div>

                  <div className="space-y-1 text-left">
                    <label htmlFor="nome" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Ex: João Silva"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition text-sm bg-slate-50/50"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label htmlFor="whatsapp" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="Ex: (92) 99999-9999"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition text-sm bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ex: joao@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition text-sm bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label htmlFor="interesse" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Qual seu interesse?
                    </label>
                    <select
                      id="interesse"
                      name="interesse"
                      value={formData.interesse}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition text-sm bg-slate-50/50 cursor-pointer"
                    >
                      <option value="compra">Tenho interesse em um veículo do estoque</option>
                      <option value="financiamento">Dúvida sobre Financiamento</option>
                      <option value="duvida">Outras dúvidas / Informações gerais</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label htmlFor="mensagem" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Como podemos te ajudar? (Opcional)
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={3}
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Escreva sua dúvida ou nos diga qual veículo do nosso estoque chamou sua atenção..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition text-sm bg-slate-50/50 resize-none"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold h-12 rounded-lg cursor-pointer shadow-lg shadow-brand-red/10 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Enviando...
                      </span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar Contato
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


