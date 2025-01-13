import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html',
  styleUrls: ['./app.layout.component.css'],
})
export class AppLayoutComponent implements OnInit {
  usuario: any | null;

  // constructor(private readonly cookieService: AuthCookieService) {}

  ngOnInit(): void {
    // this.usuario = this.cookieService.getUserDataFromToken();
  }
}
