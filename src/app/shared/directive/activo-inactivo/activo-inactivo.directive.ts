import { Directive, Input, OnInit } from '@angular/core';
import { Tag } from 'primeng/tag';
import { ActivosState } from '../../enums';

@Directive({
  selector: '[appActivoInactivo]',
})
export class ActivoInactivoDirective implements OnInit {
  @Input('appActivoInactivo') appActivoInactivo!: ActivosState;;

  constructor(private pTag: Tag) {}

  ngOnInit(): void {

    console.log(this.appActivoInactivo);
    const config = this.getTagConfig(this.appActivoInactivo);
    this.pTag.value = config.value;
    this.pTag.severity = config.severity;
  }

  private getTagConfig(activosState: ActivosState) {
    switch (activosState) {
      case ActivosState.ACTIVO:
        return { value: 'ACTIVO', severity: 'success' };
      case ActivosState.INACTIVO:
        return { value: 'INACTIVO', severity: 'danger' };
      default:
        return { value: 'DESCONOCIDO', severity: 'info' };
    }
  }
}
