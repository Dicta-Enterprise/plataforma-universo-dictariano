import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';              // <- IMPORTANTE para [(ngModel)]
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

// PrimeNG (mismo estilo que tu LoginModule)
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password'; // opcional

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,              // <- aquí habilitas [(ngModel)]
    RegisterRoutingModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    PasswordModule           // opcional
  ]
})
export class RegisterModule {}
