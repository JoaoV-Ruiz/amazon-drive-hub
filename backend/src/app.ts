import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';

export async function buildApp() {
  const isDev = process.env.NODE_ENV !== 'production';

  const app = Fastify({
    logger: isDev
      ? {
          transport: {
            target: 'pino-pretty',
            options: { colorize: true },
          },
        }
      : true,
  });

  await app.register(cors, {
    // Em produção, troque por uma lista de domínios permitidos
    // (ex.: ['https://amazonrepasse.com.br']).
    origin: true,
  });

  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB para PDFs de manutenção
    },
  });

  app.get('/health', async () => ({ status: 'ok' }));

  // Módulos (registrar cada router aqui):
  // await app.register(authRoutes, { prefix: '/auth' });
  // await app.register(carsRoutes, { prefix: '/cars' });
  // await app.register(leadsRoutes, { prefix: '/leads' });
  // await app.register(partnersRoutes, { prefix: '/partners' });
  // await app.register(maintenanceRoutes, { prefix: '/maintenance' });
  // await app.register(consignmentsRoutes, { prefix: '/consignments' });

  return app;
}
