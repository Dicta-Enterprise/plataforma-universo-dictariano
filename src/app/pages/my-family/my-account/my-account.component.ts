import { Component } from '@angular/core';

export interface CursoCuenta {
  id: string;
  nombre: string;
  tipo: 'joven' | 'nino';
  imagen: string;
  colorTheme: 'amber' | 'emerald'; // Amber (Joven), Emerald (Niño)
  email: string;
  permisos: {
    verPerfil: boolean;
    interaccionForos: boolean;
    verCalificacion: boolean;
    cambiarAvatar: boolean;
    verProgreso: boolean;
  };
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
  // Pestaña activa: 'mi-cuenta' | 'joven' | 'nino'
  activeTab: 'mi-cuenta' | 'joven' | 'nino' = 'joven';

  // Datos dinámicos por tipo de cuenta
  cuentasData: Record<'joven' | 'nino', CursoCuenta> = {
    joven: {
      id: 'joven',
      nombre: 'Adolescencia y Amor',
      tipo: 'joven',
      imagen:
        'https://img.freepik.com/fotos-premium/linda-pareja-enamorada-dibujos-animados_1029469-101356.jpg',
      colorTheme: 'amber',
      email: 'coreoelectronico@gmail.com',
      permisos: {
        verPerfil: true,
        interaccionForos: true,
        verCalificacion: true,
        cambiarAvatar: false,
        verProgreso: true,
      },
    },
    nino: {
      id: 'nino',
      nombre: 'Grooming',
      tipo: 'nino',
      imagen:
        'https://img.freepik.com/fotos-premium/foto-de-um-menino-bonito-no-estilo-pixar-desenho-animado-3d-ilustracao-generativa-ai_776674-524491.jpg',
      colorTheme: 'emerald',
      email: 'coreoelectronico@gmail.com',
      permisos: {
        verPerfil: true,
        interaccionForos: true,
        verCalificacion: true,
        cambiarAvatar: false,
        verProgreso: true,
      },
    },
  };

  // Getter para obtener rápidamente los datos de la pestaña actual
  get currentCuenta(): CursoCuenta | null {
    if (this.activeTab === 'mi-cuenta') return null;
    return this.cuentasData[this.activeTab];
  }
}
