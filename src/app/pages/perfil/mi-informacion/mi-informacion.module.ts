import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiInformacionComponent } from './mi-informacion.component';
import { MiInformacionRoutingModule } from './mi-informacion-routing.module';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MiInformacionComponent
  ],
  imports: [
    CommonModule,
    MiInformacionRoutingModule,

    // PrimeNG
    CardModule,
    ButtonModule,
    AvatarModule,
    PasswordModule,
    DividerModule,
    InputTextModule,
    AccordionModule,
    FormsModule
  ],
  exports:[
    MiInformacionComponent
  ]
})
export class MiInformacionModule { }
