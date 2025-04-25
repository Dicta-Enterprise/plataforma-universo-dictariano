import { Directive, Input, OnInit } from '@angular/core';
import { Tag } from 'primeng/tag';

@Directive({
  selector: '[appBooleanStatus]',
})
export class BooleanStatusDirective implements OnInit {
  @Input('appBooleanStatus') estado!: boolean;

  constructor(private pTag: Tag) {}

  ngOnInit() {
    const config = this.getTagConfig(this.estado);
    this.pTag.value = config.value;
    this.pTag.severity = config.severity;
  }

  private getTagConfig(estado: boolean) {
    switch (estado) {
      case true:
        return { value: 'ACTIVO', severity: 'success' };
      case false:
        return { value: 'INACTIVO', severity: 'danger' };
      default:
        return { value: 'DESCONOCIDO', severity: 'info' };
    }
  }
}
