import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Estandar } from 'src/app/core/class/estandar/Estandar.class';
import { AlertService } from 'src/app/shared/services/alert.service';



const VALUE_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomGalaxiasDropdownComponent),
  multi: true,
};


@Component({
  selector: 'app-custom-galaxias-dropdown',
  templateUrl: './custom-galaxias-dropdown.component.html',
  styleUrls: ['./custom-galaxias-dropdown.component.css'],
  providers: [VALUE_ACCESOR],
})
export class CustomGalaxiasDropdownComponent 
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private subscription: Subscription = new Subscription();
  galaxiasControl: FormControl;
  isLoading: boolean = false;

  galaxias: Estandar[] = [];
  @Input() label: string = 'Estado de Vehiculo';

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  isDisabled = false;
  value: Estandar;

  constructor(private alertService: AlertService) {
    this.galaxiasControl = new FormControl({
      value: null,
      disabled: this.isDisabled,
    });
  }

  ngOnInit(): void {}

  writeValue(obj: Estandar): void {
    this.value = obj;
    this.galaxiasControl.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleValueChange(event: any): void {
    const selectedValue = event.value;
    this.onChange(selectedValue);
    this.onTouched();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
