import { NgModule } from '@angular/core';
import { ActivoInactivoDirective } from './activo-inactivo/activo-inactivo.directive';
import { BooleanStatusDirective } from './activo-inactivo/boolean-status.directive';
import { ErrorFormDirective } from './error-form/error-form-directive';

@NgModule({
  declarations: [ActivoInactivoDirective, BooleanStatusDirective, ErrorFormDirective],
  exports: [ActivoInactivoDirective, BooleanStatusDirective, ErrorFormDirective],
})
export class SharedDirectiveModule {}
