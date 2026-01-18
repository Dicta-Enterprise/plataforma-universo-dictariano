import { NgModule } from '@angular/core';
import { FormatoHorasPipe } from './formato-horas/formato-horas.pipe';
import { FormatoBeneficiosPipe } from './formato-beneficios/formato-beneficios.pipe';
import { FormatoDescripcionPipe } from './formato-descripcion/formato-descripcion.pipe';



@NgModule({
  declarations: [
    FormatoHorasPipe,
    FormatoBeneficiosPipe,
    FormatoDescripcionPipe
  ],
  exports: [
    FormatoHorasPipe,
    FormatoBeneficiosPipe,
    FormatoDescripcionPipe
  ],
})
export class SharedPipeModule{}