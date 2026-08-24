import { Component } from '@angular/core';
import { CuentaAsociada } from 'src/app/core/interfaces/interfaces';

export interface UserFormData {
  email: string;
  tuCumpleanos: string;
  edad: number;
  contrasena: string;
  alias: string;
  aliasFamilia: string;
  nivelEconomico: string;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
  activeTab: 'mi-cuenta' | 'joven' | 'nino' = 'mi-cuenta';

  // Datos simulados
  cuentasData: CuentaAsociada[] = [
    {
      id: 1,
      nombre: 'Juan Camilo',
      tipo: 'joven',
      imagen: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      email: 'coreoelectronico@gmail.com',
      cumpleanos: '01-01',
      edad: 16,
      invitacionEstado: 'inactiva',
      permisos: {
        verPerfil: true,
        interaccionForos: true,
        verCalificacion: true,
        cambiarAvatar: false,
        verProgreso: true,
        consentimiento: false,
        tiempoEnPantalla: 60,
      },
    },
    {
      id: 2,
      nombre: 'Juanito',
      tipo: 'nino',
      cumpleanos: '01-02',
      imagen: 'https://images.unsplash.com/photo-1543332164-6e82f355badc',
      email: 'coreoelectronico@gmail.com',
      edad: 10,
      invitacionEstado: 'activa',
      permisos: {
        verPerfil: true,
        interaccionForos: true,
        verCalificacion: true,
        cambiarAvatar: false,
        verProgreso: true,
        consentimiento: false,
        tiempoEnPantalla: 60,
      },
    },
  ];

  onCrearCuenta(tipoCuenta: 'joven' | 'nino'): void {
    const nuevaCuenta: CuentaAsociada = {
      id: Date.now(),
      nombre: 'Nuevo usuario',
      tipo: tipoCuenta,
      imagen: '',
      email: '',
      cumpleanos: '',
      edad: tipoCuenta === 'joven' ? 13 : 9,
      invitacionEstado: 'inactiva',
      permisos: {
        verPerfil: true,
        interaccionForos: true,
        verCalificacion: true,
        cambiarAvatar: true,
        verProgreso: true,
        consentimiento: false,
        tiempoEnPantalla: 60,
      },
    };

    this.cuentasData = [...this.cuentasData, nuevaCuenta];
  }

  // Garantiza siempre mostrar minimo 3 tarjetas de cuenta asociada
  get tarjetasParaMostrar(): (CuentaAsociada | null)[] {
    const cuentasFiltradas = this.cuentasData.filter(
      (cuenta) => cuenta.tipo === this.activeTab,
    );

    const tarjetas: (CuentaAsociada | null)[] = [...cuentasFiltradas];

    while (tarjetas.length < 3) {
      tarjetas.push(null);
    }

    return tarjetas;
  }

  get currentCuenta(): CuentaAsociada | null {
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
    if (field === 'email') return;

    // Si se está guardando la edición de la edad, validamos
    if (field === 'edad' && this.editState.edad) {
      this.validarEdad();
    }

    this.editState[field] = !this.editState[field];
  }

  get isEditing(): boolean {
    return Object.values(this.editState).some((isEdit) => isEdit);
  }

  guardarCambios(): void {
    this.validarEdad();
    this.originalData = { ...this.formData };

    // Restablecer estados de edición a false
    Object.keys(this.editState).forEach((key) => {
      this.editState[key as keyof UserFormData] = false;
    });
  }

  validarEdad(): void {
    const edadActual = Number(this.formData.edad);

    if (isNaN(edadActual) || edadActual < 18) {
      this.formData.edad = 18;
    } else if (edadActual > 100) {
      this.formData.edad = 100;
    }
  }

  // MÉTODOS Y ESTADOS DEL MODAL DE ELIMINACIÓN CUENTA
  showDeleteModal = false;
  pasoEliminacion = 1;
  confirmEmailInput = '';
  confirmContrasenaInput = '';

  abrirModalEliminar(): void {
    this.pasoEliminacion = 1;
    this.confirmEmailInput = '';
    this.confirmContrasenaInput = '';
    this.showDeleteModal = true;
  }

  cerrarModalEliminar(): void {
    this.pasoEliminacion = 1;
    this.confirmEmailInput = '';
    this.confirmContrasenaInput = '';
    this.showDeleteModal = false;
  }

  siguientePaso(): void {
    if (this.pasoEliminacion < 3) {
      this.pasoEliminacion++;
    }
  }

  pasoAnterior(): void {
    if (this.pasoEliminacion > 1) {
      this.pasoEliminacion--;
    }
  }

  get esFormularioPaso3Valido(): boolean {
    return (
      this.confirmEmailInput.trim().toLowerCase() ===
        this.formData.email.trim().toLowerCase() &&
      this.confirmContrasenaInput === this.formData.contrasena
    );
  }

  confirmarEliminacion(): void {
    if (this.esFormularioPaso3Valido) {
      alert(
        'Solicitud enviada con éxito. Se ha enviado un correo de confirmación.',
      );
      this.cerrarModalEliminar();
    }
  }
}
