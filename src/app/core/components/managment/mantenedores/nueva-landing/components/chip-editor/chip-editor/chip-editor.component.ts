import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chip-editor',
  templateUrl: './chip-editor.component.html',
  styleUrls: ['./chip-editor.component.css']
})
export class ChipEditorComponent {
  @Input() contenidoControl!: FormControl;
  @Output() contenidoChange = new EventEmitter<string[]>();

  chipEditado: string = '';
  indiceEditado: number = -1;
  mostrarDialogoEdicion: boolean = false;

  trimContenido() {
    this.contenidoControl.setValue(this.contenidoControl.value.map((item: string) => item.trim()));
    this.emitirCambio();
  }

  editarChip(chip: string) {
    const contenidoActual = this.contenidoControl.value;
    const index = contenidoActual.indexOf(chip);

    if (index !== -1) {
      this.chipEditado = chip;
      this.indiceEditado = index;
      this.mostrarDialogoEdicion = true;
    }
  }

  guardarEdicionChip() {
    if (this.chipEditado.trim() !== '') {
      this.contenidoControl.value[this.indiceEditado] = this.chipEditado.trim();
      this.contenidoControl.setValue([...this.contenidoControl.value]);
      this.emitirCambio();
    }
    this.mostrarDialogoEdicion = false;
  }

  private emitirCambio() {
    this.contenidoChange.emit(this.contenidoControl.value);
  }
}
