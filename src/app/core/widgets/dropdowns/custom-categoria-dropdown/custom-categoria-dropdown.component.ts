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
  useExisting: forwardRef(() => CustomCategoriaDropdownComponent),
  multi: true,
};

@Component({
  selector: 'app-custom-categoria-dropdown',
  templateUrl: './custom-categoria-dropdown.component.html',
  styleUrls: ['./custom-categoria-dropdown.component.css'],
  providers: [VALUE_ACCESOR],
})
export class CustomCategoriaDropdownComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private subscription: Subscription = new Subscription();
  categoriaControl: FormControl;
  isLoading: boolean = false;

  categorias: Estandar[] = [];
  @Input() label: string = 'Estado de Vehiculo';

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  isDisabled = false;
  value: Estandar;

  constructor(private alertService: AlertService) {
    this.categoriaControl = new FormControl({
      value: null,
      disabled: this.isDisabled,
    });
  }

  ngOnInit(): void {}

  writeValue(obj: Estandar): void {
    this.value = obj;
    this.categoriaControl.patchValue(obj);
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
