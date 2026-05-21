import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/security/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterModule } from '@angular/router';
import { ActivoInactivoPipe } from './shared/pipes/activo-inactivo/activo-inactivo.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CUSTOM_PROVIDERS } from './core/providers/providers';
import { SharedSpinnerModule } from './shared/components/spinners/shared-spinner.module';
import { ToastModule } from 'primeng/toast';
import { CartPopupModule } from './shared/components/cart-popup/cart-popup.module';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { BlankLayoutComponent } from './shared/layouts/blank-layout/blank-layout.component';
import { CheckoutNavbarComponent } from './shared/components/checkout-navbar/checkout-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CheckoutNavbarComponent,
    FooterComponent,
    ActivoInactivoPipe,
    MainLayoutComponent, 
    BlankLayoutComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MenubarModule,
    AvatarModule,
    MenuModule,
    StyleClassModule,
    InputTextModule,
    SharedSpinnerModule,

    ButtonModule,
    HttpClientModule,
    SharedModule,
    CartPopupModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    ...CUSTOM_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
