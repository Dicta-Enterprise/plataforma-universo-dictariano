import { Component, Input } from '@angular/core';
import { CursoCuenta } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-associated-account-card',
  templateUrl: './associated-account-card.component.html',
  styleUrls: ['./associated-account-card.component.css'],
})
export class AssociatedAccountCardComponent {
  @Input() account: CursoCuenta | null | undefined = null;
  @Input() fallbackTheme: 'yellow' | 'emerald' = 'yellow';

  // Banderas de edición por campo
  isEditingNombre = false;
  isEditingCumpleanos = false;
  isEditingEdad = false;

  toggleEdit(field: 'nombre' | 'cumpleanos' | 'edad'): void {
    if (field === 'nombre') this.isEditingNombre = !this.isEditingNombre;
    if (field === 'cumpleanos')
      this.isEditingCumpleanos = !this.isEditingCumpleanos;
    if (field === 'edad') this.isEditingEdad = !this.isEditingEdad;
  }
}
