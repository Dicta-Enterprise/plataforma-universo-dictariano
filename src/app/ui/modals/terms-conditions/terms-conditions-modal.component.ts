import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ModalService } from 'src/app/containers/host/app-modal.service';
import { TermsConditionsContentComponent } from 'src/app/pages/payment/terms_conditions/terms-conditions-content/terms-conditions-content.component';

@Component({
  selector: 'app-terms-conditions-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    TermsConditionsContentComponent
  ],
  templateUrl: './terms-conditions-modal.component.html',
  styleUrls: ['./terms-conditions-modal.component.css']
})
export class TermsConditionsModalComponent {
  visible = true;

  constructor(private modalService: ModalService) {}

  cerrar() {
    this.visible = false;
    this.modalService.close();
  }
}