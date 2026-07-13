import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {

  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
