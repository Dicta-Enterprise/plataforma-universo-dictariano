import { NgModule } from '@angular/core';
import { FormatoHorasPipe } from './formato-horas/formato-horas.pipe';
import { FormatoBeneficiosPipe } from './formato-beneficios/formato-beneficios.pipe';
import { FormatoDescripcionPipe } from './formato-descripcion/formato-descripcion.pipe';
import { DayMonthFormatPipe } from './day-month-format/day-month-format.pipe';

@NgModule({
  declarations: [
    FormatoHorasPipe,
    FormatoBeneficiosPipe,
    FormatoDescripcionPipe,
    DayMonthFormatPipe,
  ],
  exports: [
    FormatoHorasPipe,
    FormatoBeneficiosPipe,
    FormatoDescripcionPipe,
    DayMonthFormatPipe,
  ],
})
export class SharedPipeModule {}
