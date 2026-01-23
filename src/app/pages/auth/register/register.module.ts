import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RegisterRoutingModule,
    AuthThemeModule,
  ],
})
export class RegisterModule {}

