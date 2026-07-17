import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css'],
})
export class TermsConditionsComponent {

  constructor(private readonly location: Location) {}

}
