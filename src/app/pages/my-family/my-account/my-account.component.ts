import { Component } from '@angular/core';
import { CursoCuenta } from 'src/app/core/interfaces/interfaces';

export interface UserFormData {
  email: string;
  tuCumpleanos: string;
  edad: number;
  contrasena: string;
  alias: string;
  aliasFamilia: string;
  nivelEconomico: string;

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
  activeTab: 'mi-cuenta' | 'joven' | 'nino' = 'mi-cuenta';

  // Datos simulados
  cuentasData: CursoCuenta[] = [
    {
      id: 1,
  // Pestaña activa: 'mi-cuenta' | 'joven' | 'nino'
  activeTab: 'mi-cuenta' | 'joven' | 'nino' = 'mi-cuenta';

  // Datos dinámicos por tipo de cuenta
  cuentasData: Record<'joven' | 'nino', CursoCuenta> = {
    joven: {
      id: 'joven',
      nombre: 'Adolescencia y Amor',
      tipo: 'joven',
      imagen:
        'https://img.freepik.com/fotos-premium/linda-pareja-enamorada-dibujos-animados_1029469-101356.jpg',
      email: 'coreoelectronico@gmail.com',
      cumpleanos: '01-01',
      edad: 16,
      colorTheme: 'amber',
      email: 'coreoelectronico@gmail.com',
      permisos: {
        verPerfil: true,
        interaccionForos: true,
        verCalificacion: true,
        cambiarAvatar: false,
        verProgreso: true,
        consentimiento: true,
        tiempoEnPantalla: false,
      },
    },
    {
      id: 2,
      nombre: 'Grooming',
      tipo: 'nino',
      cumpleanos: '01-02',
      imagen:
        'https://img.freepik.com/fotos-premium/foto-de-um-menino-bonito-no-estilo-pixar-desenho-animado-3d-ilustracao-generativa-ai_776674-524491.jpg',
      email: 'coreoelectronico@gmail.com',
      edad: 10,
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
        consentimiento: true,
        tiempoEnPantalla: true,
      },
    },
  ];

  // Garantiza siempre mostrar minimo 3 tarjetas de cuenta asociada
  get tarjetasParaMostrar(): (CursoCuenta | null)[] {
    const cuentasFiltradas = this.cuentasData.filter(
      (cuenta) => cuenta.tipo === this.activeTab,
    );

    const tarjetas: (CursoCuenta | null)[] = [...cuentasFiltradas];

    while (tarjetas.length < 3) {
      tarjetas.push(null);
    }

    return tarjetas;
  }

  get currentCuenta(): CursoCuenta | null {
    if (this.activeTab === 'mi-cuenta') return null;
    return (
      this.cuentasData.find((cuenta) => cuenta.tipo === this.activeTab) || null
    );
  }

  // MÉTODOS Y PROPIEDADES DEL FORMULARIO MI CUENTA
  originalData: UserFormData = {
    email: 'carlos.m@ejemplo.com',
    tuCumpleanos: '08-15',
    edad: 25,
    contrasena: 'contrasena123',
    alias: 'Carloz Mendoza',
    aliasFamilia: 'Familia Mendoza',
    nivelEconomico: 'medio',
  };

  formData: UserFormData = { ...this.originalData };

  editState: Record<keyof UserFormData, boolean> = {
    email: false,
    tuCumpleanos: false,
    edad: false,
    contrasena: false,
    alias: false,
    aliasFamilia: false,
    nivelEconomico: false,
  };

  get hasChanges(): boolean {
    return JSON.stringify(this.formData) !== JSON.stringify(this.originalData);
  }

  toggleEdit(field: keyof UserFormData): void {
    if (field === 'email') return; // El correo no se puede modificar
    this.editState[field] = !this.editState[field];
  }

  get isEditing(): boolean {
    return Object.values(this.editState).some((isEdit) => isEdit);
  }

  guardarCambios(): void {
    this.originalData = { ...this.formData };

    // Restablecer estados de edición a false
    Object.keys(this.editState).forEach((key) => {
      this.editState[key as keyof UserFormData] = false;
    });
  }

  // MÉTODOS DEL MODAL DE ELIMINACIÓN
  showDeleteModal = false;
  confirmContrasenaInput = '';

  abrirModalEliminar(): void {
    this.confirmContrasenaInput = '';
    this.showDeleteModal = true;
  }

  cerrarModalEliminar(): void {
    this.confirmContrasenaInput = '';
    this.showDeleteModal = false;
  }

  confirmarEliminacion(): void {
    if (this.confirmContrasenaInput === this.formData.contrasena) {
      this.cerrarModalEliminar();
    }
      },
    },
  };

  // Getter para obtener rápidamente los datos de la pestaña actual
  get currentCuenta(): CursoCuenta | null {
    if (this.activeTab === 'mi-cuenta') return null;
    return this.cuentasData[this.activeTab];
  }
}
