export type UserRole = 'admin' | 'partner';

/**
 * Perfil ligado a `auth.users` (Supabase Auth). Cliente é anônimo e
 * não tem perfil.
 */
export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  partnerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CarStatus = 'DISPONIVEL' | 'VENDIDO';

export interface Car {
  id: string;
  brand: string;
  model: string;
  /**
   * Atenção (RN004): a placa NUNCA deve ser enviada ao cliente público.
   * Este campo só existe em respostas para admin e parceiro.
   */
  plate?: string;
  year: number;
  price: number;
  km: number;
  fuel: string;
  description: string;
  status: CarStatus;
  partnerId?: string | null;
  maintenancePdf?: string | null;
  images: CarImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CarImage {
  id: string;
  carId: string;
  url: string;
}

export type LeadStatus = 'NOVO' | 'EM_CONTATO' | 'FECHADO' | 'PERDIDO';

export interface Lead {
  id: string;
  carId: string;
  name: string;
  phone: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type ConsignmentStatus = 'ATIVA' | 'ENCERRADA';

export interface Consignment {
  id: string;
  carId: string;
  partnerId: string;
  status: ConsignmentStatus;
}
