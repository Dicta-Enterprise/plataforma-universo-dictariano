import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Estandar } from 'src/app/core/class/estandar/Estandar.class';
import { AlertService } from 'src/app/shared/services/alert.service';

const VALUE_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomPlanetasDropdownComponent),
  multi: true,
};

@Component({
  selector: 'app-custom-planetas-dropdown',
  templateUrl: './custom-planetas-dropdown.component.html',
  styleUrls: ['./custom-planetas-dropdown.component.css'],
  providers: [VALUE_ACCESOR],
})
export class CustomPlanetasDropdownComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private subscription: Subscription = new Subscription();
  planetasControl: FormControl;
  isLoading: boolean = false;

  planetas: Estandar[] = [];
  @Input() label: string = 'Planetas';

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  isDisabled = false;
  value: Estandar;

  constructor(private alertService: AlertService) {
    this.planetasControl = new FormControl({
      value: null,
      disabled: this.isDisabled,
    });
  }

  ngOnInit(): void {}

  writeValue(obj: Estandar): void {
    this.value = obj;
    this.planetasControl.patchValue(obj);
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
