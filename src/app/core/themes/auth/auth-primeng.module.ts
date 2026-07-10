import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    CheckboxModule,
    DividerModule,
    DialogModule,      
    ScrollPanelModule, 
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    CheckboxModule,
    DialogModule,
    ScrollPanelModule,
  ],
  providers: [
    MessageService
  ],
})
export class AuthThemeModule {}
