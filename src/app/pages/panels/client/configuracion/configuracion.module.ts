import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './configuracion.component';

import {StyleClassModule} from 'primeng/styleclass';

@NgModule({
  declarations: [
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    StyleClassModule
  ]
})
export class ConfiguracionModule { }
