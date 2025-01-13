import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from './app.layout.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { AppSidebarComponent } from '../sidebar/app.sidebar.component';
import { AppTopbarComponent } from '../topbar/topbar.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppSidebarComponent,
    AppLayoutComponent,
    AppTopbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RippleModule,
    StyleClassModule,
    SelectButtonModule,
    ButtonModule,
    RouterModule,
    BadgeModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    
  ],
  exports: [AppLayoutComponent],

})
export class AppLayoutModule { }
