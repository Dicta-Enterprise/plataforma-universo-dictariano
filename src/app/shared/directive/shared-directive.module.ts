import { NgModule } from '@angular/core';
import { ActivoInactivoDirective } from './activo-inactivo/activo-inactivo.directive';

@NgModule({
  declarations: [ActivoInactivoDirective],
  exports: [ActivoInactivoDirective],
})
export class SharedDirectiveModule {}
