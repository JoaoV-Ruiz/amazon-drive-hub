import { Route, Routes } from 'react-router-dom';

function Placeholder({ title }: { title: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow p-8 text-center">
        <h1 className="text-2xl font-semibold text-brand">{title}</h1>
        <p className="mt-2 text-neutral-600">
          Página em construção. Implemente em{' '}
          <code className="px-1 rounded bg-neutral-100">src/pages</code>.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/" element={<Placeholder title="AmazonRepasse" />} />
      <Route path="/estoque" element={<Placeholder title="Estoque" />} />
      <Route path="/carro/:id" element={<Placeholder title="Detalhe do veículo" />} />
      <Route path="/vendidos" element={<Placeholder title="Vendidos" />} />

      {/* Auth */}
      <Route path="/login" element={<Placeholder title="Login" />} />

      {/* Admin */}
      <Route path="/admin" element={<Placeholder title="Admin — Dashboard" />} />
      <Route path="/admin/carros" element={<Placeholder title="Admin — Carros" />} />
      <Route path="/admin/leads" element={<Placeholder title="Admin — Leads" />} />
      <Route path="/admin/parceiros" element={<Placeholder title="Admin — Parceiros" />} />
      <Route path="/admin/config" element={<Placeholder title="Admin — Configurações" />} />

      {/* Parceiro */}
      <Route path="/partner" element={<Placeholder title="Parceiro — Dashboard" />} />
      <Route path="/partner/frota" element={<Placeholder title="Parceiro — Frota" />} />
      <Route
        path="/partner/meus-consignados"
        element={<Placeholder title="Parceiro — Meus consignados" />}
      />

      <Route path="*" element={<Placeholder title="404" />} />
    </Routes>
  );
}
