import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiperfilRoutingModule } from './miperfil-routing.module';

import {StyleClassModule} from 'primeng/styleclass';
import { MiperfilComponent } from './miperfil.component';

@NgModule({
  declarations: [
    MiperfilComponent
  ],
  imports: [
    CommonModule,
    MiperfilRoutingModule,
    StyleClassModule
  ]
})
export class MiperfilModule { }
