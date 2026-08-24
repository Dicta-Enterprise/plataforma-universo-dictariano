import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CuentaAsociada } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-associated-account-card',
  templateUrl: './associated-account-card.component.html',
  styleUrls: ['./associated-account-card.component.css'],
})
export class AssociatedAccountCardComponent {
  @Input() fallback: 'joven' | 'nino' | null | undefined = null;
  @Input() account: CuentaAsociada | null | undefined = null;
  @Output() createAccount = new EventEmitter<'joven' | 'nino'>();

  crearNuevaCuenta(): void {
    const tipoCuenta: 'joven' | 'nino' = this.fallback || 'nino';
    this.createAccount.emit(tipoCuenta);
  }

  // LOGICA PARA EDITAR NOMBRE, CUMPLEANOS Y EDAD
  isEditingNombre = false;
  isEditingCumpleanos = false;
  isEditingEdad = false;

  toggleEdit(field: 'nombre' | 'cumpleanos' | 'edad'): void {
    if (field === 'nombre') this.isEditingNombre = !this.isEditingNombre;
    if (field === 'cumpleanos')
      this.isEditingCumpleanos = !this.isEditingCumpleanos;
    if (field === 'edad') {
      this.isEditingEdad = !this.isEditingEdad;
    }
  }

  getEdadesDisponibles(): number[] {
    const min = this.account?.tipo === 'nino' ? 9 : 13;
    const max = this.account?.tipo === 'nino' ? 12 : 17;

    const edades: number[] = [];
    for (let i = min; i <= max; i++) {
      edades.push(i);
    }
    return edades;
  }

  // LOGICA DE PERMISOS
  togglePermiso(
    permiso: Extract<
      keyof CuentaAsociada['permisos'],
      | 'verPerfil'
      | 'interaccionForos'
      | 'verCalificacion'
      | 'cambiarAvatar'
      | 'verProgreso'
    >,
  ): void {
    if (this.account?.permisos) {
      this.account.permisos[permiso] = !this.account.permisos[permiso];
    }
  }

  readonly opcionesTiempo: { label: string; value: number | null }[] = [
    { label: '30 minutos', value: 30 },
    { label: '45 minutos', value: 45 },
    { label: '1 hora', value: 60 },
  ];

  // LOGICA DE CONSENTIMIENTO INFORMADO
  @Input() userCountry = 'CO';
  @Output() resultado = new EventEmitter<{ given: boolean; date: string }>();
  showConsentModal = false;
  mostrarTextoLegal = false;
  consentimientoAceptado = false;
  get bloqueJurisdiccionPrincipal(): string {
    if (['US', 'PR'].includes(this.userCountry)) return 'usa';
    if (this.esPaisUE(this.userCountry)) return 'ue';
    return 'latam';
  }

  private esPaisUE(countryCode: string): boolean {
    const euCountries = [
      'AT',
      'BE',
      'BG',
      'HR',
      'CY',
      'CZ',
      'DK',
      'EE',
      'FI',
      'FR',
      'DE',
      'GR',
      'HU',
      'IE',
      'IT',
      'LV',
      'LT',
      'LU',
      'MT',
      'NL',
      'PL',
      'PT',
      'RO',
      'SK',
      'SI',
      'ES',
      'SE',
    ];
    return euCountries.includes(countryCode.toUpperCase());
  }

  abrirConsentimientoModal(): void {
    this.showConsentModal = true;
    this.consentimientoAceptado = false;
    this.mostrarTextoLegal = false;
  }

  cerrarConsentimientoModal(): void {
    this.showConsentModal = false;
    this.resultado.emit({ given: false, date: '' });
  }

  aceptarConsentimiento(): void {
    if (!this.consentimientoAceptado) return;

    if (this.account && this.account.permisos) {
      this.account.permisos.consentimiento = true;
    }

    const isoDate = new Date().toISOString();
    this.resultado.emit({ given: true, date: isoDate });

    this.showConsentModal = false;
  }

  revocarConsentimiento(): void {
    if (this.account && this.account.permisos) {
      this.account.permisos.consentimiento = false;
    }
    // Aquí puedes emitir un evento a backend para registrar la revocación si es necesario
  }

  // LOGICA DE ENVIO DE INVITACION
  esEmailValido(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  procesarInvitacion(): void {
    if (!this.account || !this.esEmailValido(this.account.email)) return;

    if (this.consentimientoAceptado) {
      this.finalizarEnvioInvitacion();
    } else {
      this.abrirConsentimientoModal();
    }
  }

  finalizarEnvioInvitacion(): void {
    if (!this.account?.email) return;
    this.account.invitacionEstado = 'pendiente';
    // Aquí ejecutas la llamada a la API para registrar el envío del correo
  }

  reenviarInvitacion(): void {
    // API Call para volver a mandar el correo
  }

  cancelarInvitacion(): void {
    if (!this.account?.email) return;
    this.account.invitacionEstado = 'inactiva';
  }

  habilitarEdicionEmail(): void {
    if (!this.account?.email) return;
    this.account.invitacionEstado = 'inactiva';
  }
}
