import { Directive, Input, OnInit } from '@angular/core';
import { Tag } from 'primeng/tag';
import { NewActivoState } from '../../enums';

@Directive({
  selector: '[appActivoInactivo]',
})
export class ActivoInactivoDirective implements OnInit {
  @Input('appActivoInactivo') appActivoInactivo!: NewActivoState;

  constructor(private pTag: Tag) {}

  ngOnInit(): void {
    const config = this.getTagConfig(this.appActivoInactivo);
    this.pTag.value = config.value;
    this.pTag.severity = config.severity;
  }

  private getTagConfig(activosState: NewActivoState) {
    switch (activosState) {
      case NewActivoState.ACTIVO:
        return { value: 'ACTIVO', severity: 'success' };
      case NewActivoState.INACTIVO:
        return { value: 'INACTIVO', severity: 'danger' };
      default:
        return { value: 'DESCONOCIDO', severity: 'info' };
    }
  }
}
