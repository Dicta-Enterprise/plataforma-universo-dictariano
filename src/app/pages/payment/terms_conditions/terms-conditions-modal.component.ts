import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-terms-conditions-modal',
  templateUrl: './terms-conditions-modal.component.html',
  styleUrls: ['./terms-conditions-modal.component.css']
})
export class TermsConditionsModalComponent {

  @Input() visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();

  cerrar(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}