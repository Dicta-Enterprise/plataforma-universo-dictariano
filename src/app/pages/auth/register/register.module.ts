import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';
import { SharedDirectiveModule } from "src/app/shared/directive/shared-directive.module";

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RegisterRoutingModule,
    AuthThemeModule,
    SharedDirectiveModule,
  ],
})
export class RegisterModule {}

