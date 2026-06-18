import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StepPresenter } from 'src/app/core/helpers/form/step.presenter';
import { CrearOrdenRequest } from 'src/app/core/class/payment/payment.request.class';

@Injectable()
export class PaymentFormPresenter extends StepPresenter<CrearOrdenRequest> {
  public holder!:    FormControl;
  public email!:     FormControl;
  public docType!:   FormControl;
  public docNumber!: FormControl;

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  public initForm(): void {
    this.holder    = new FormControl(null, Validators.required);
    this.email     = new FormControl(null, [Validators.required, Validators.email]);
    this.docType   = new FormControl(null, Validators.required);
    this.docNumber = new FormControl(null, Validators.required);
  }

  public createForm(): void {
    this.initForm();
    this.form = this.fb.group({
      holder:    this.holder,
      email:     this.email,
      docType:   this.docType,
      docNumber: this.docNumber,
    });
  }
}