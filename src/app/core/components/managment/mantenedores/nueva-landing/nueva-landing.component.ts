import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';
import { createNuevaLandingForm } from 'src/app/core/forms/managment/landing-page.form';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-nueva-landing',
  templateUrl: './nueva-landing.component.html',
  styleUrls: ['./nueva-landing.component.css']
})
export class NuevaLandingComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  @Input() isNuevaLanding: boolean = false;
  @Input() landing: LandingPageManagment = new LandingPageManagment();
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  landingForm: FormGroup = createNuevaLandingForm(this.fb);

  constructor(private fb: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void { }

  onShow() { }

  onHide() {
    this.onHideEmit.emit(false);
  }

  crearLanding() {
    if (this.landingForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }
  }

  guardarLanding(landing: LandingPageManagment) { }

  actualizarLanding(landing: LandingPageManagment) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
