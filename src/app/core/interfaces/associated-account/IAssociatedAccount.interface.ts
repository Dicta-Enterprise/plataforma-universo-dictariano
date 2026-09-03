export interface CuentaAsociada {
  id: number;
  nombre: string;
  tipo: 'joven' | 'nino';
  imagen: string;
  email: string;
  cumpleanos: string;
  edad: number;
  invitacionEstado: 'inactiva' | 'pendiente' | 'activa';
  permisos: {
    verPerfil: boolean;
    interaccionForos: boolean;
    verCalificacion: boolean;
    cambiarAvatar: boolean;
    verProgreso: boolean;
    consentimiento: boolean;
    tiempoEnPantalla: number | null;
  };
}
