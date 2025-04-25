import { NgModule } from '@angular/core';
import { ActivoInactivoDirective } from './activo-inactivo/activo-inactivo.directive';
import { BooleanStatusDirective } from './activo-inactivo/boolean-status.directive';

@NgModule({
  declarations: [ActivoInactivoDirective, BooleanStatusDirective],
  exports: [ActivoInactivoDirective, BooleanStatusDirective],
})
export class SharedDirectiveModule {}
