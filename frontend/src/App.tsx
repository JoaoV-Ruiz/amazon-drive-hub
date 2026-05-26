import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

const HomePage = lazy(() => import('@/pages/HomePage'));
const CarDetailPage = lazy(() => import('@/pages/CarDetailPage'));
const StockPage = lazy(() => import('@/pages/StockPage'));

// Componente utilitário para resetar o scroll para o topo em cada transição de rota/parâmetro
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

function Placeholder({ title }: { title: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow p-8 text-center">
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        <p className="mt-2 text-muted-foreground">
          Página em construção. Implemente em{' '}
          <code className="px-1 rounded bg-muted">src/pages</code>.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Routes>
        {/* Público */}
        <Route path="/" element={<HomePage />} />
        <Route path="/estoque" element={<StockPage />} />
        <Route path="/carro/:id" element={<CarDetailPage />} />
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

        <Route path="*" element={<Placeholder title="404 — Página não encontrada" />} />
      </Routes>
    </Suspense>
  );
}
