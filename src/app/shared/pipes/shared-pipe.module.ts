import { NgModule } from "@angular/core";
import { FormatoHorasPipe } from "./formato-horas/formato-horas.pipe";



@NgModule({
  declarations: [
    FormatoHorasPipe
  ],
  exports: [
    FormatoHorasPipe
  ],
})
export class SharedPipeModule{}