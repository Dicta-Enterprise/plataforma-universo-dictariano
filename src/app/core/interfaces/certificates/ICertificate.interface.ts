export type CertificateCategory = 'nino' | 'joven' | 'padres';

export interface ICertificatePayload {
  nombre: string;
  curso: string;
  fecha?: string;
  categoria: CertificateCategory;
}

export interface ICertificateIssued {
  id: string;
  codigo: string;
  hash: string;
  pdfUrl: string;
}

export interface ICertificatePublic {
  valido: boolean;
  motivo?: string;
  certificado?: {
    id: string;
    codigo: string;
    nombre: string;
    curso: string;
    fecha: string;
    categoria: CertificateCategory;
  };
  hash?: string;
  anclado?: boolean;
}

export interface ICertificateVerification {
  valido: boolean;
  motivo?: string;
  certificado?: { id: string; nombre: string; curso: string; fecha: string };
  confirmadoEnBlockchain?: boolean;
}
