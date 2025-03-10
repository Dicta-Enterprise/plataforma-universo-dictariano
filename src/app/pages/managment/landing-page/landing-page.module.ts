import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingRoutingModule } from './landing-page-routing.module';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { SharedMantenedoresModule } from 'src/app/core/components/managment/mantenedores/shared-mantenedores.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedDirectiveModule } from 'src/app/shared/directive/shared-directive.module';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    SharedMantenedoresModule,
    ConfirmDialogModule,
    SharedDirectiveModule
  ],
})
export class LandingPageModule { }
