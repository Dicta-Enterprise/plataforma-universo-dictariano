export interface CursoCuenta {
  id: number;
  nombre: string;
  tipo: 'joven' | 'nino';
  imagen: string;
  email: string;
  cumpleanos: string;
  edad: number;
  permisos: {
    verPerfil: boolean;
    interaccionForos: boolean;
    verCalificacion: boolean;
    cambiarAvatar: boolean;
    verProgreso: boolean;
    consentimiento: boolean;
    tiempoEnPantalla: boolean;
  };
}
