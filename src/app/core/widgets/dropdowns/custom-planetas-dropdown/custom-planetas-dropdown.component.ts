import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { finalize, map, Subscription } from 'rxjs';
import { PlanetaManagment } from 'src/app/core/class/managment/managment';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PlanetasManagmentService } from '../../../services/managment/planetas/planetas-managment.service';

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
  implements OnInit, OnDestroy, ControlValueAccessor {
  private subscription: Subscription = new Subscription();
  planetasControl: FormControl;
  isLoading: boolean = false;

  planetas: PlanetaManagment[] = [];
  @Input() label: string = 'Planeta';

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };
  isDisabled = false;
  value: string | null = null;

  constructor(
    private alertService: AlertService,
    private planetasManagmentService: PlanetasManagmentService
  ) {
    this.planetasControl = new FormControl(null);
  }

  ngOnInit(): void { 
    this.listarPlanetas();
  }

  listarPlanetas() {
    this.isLoading = true;
    this.subscription.add(
      this.planetasManagmentService
        .listarPlanetasService$()
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.planetas = response;
            console.log('planetas', this.planetas);
          },
          error: (error) => {
            this.alertService.showError(
              'Ups...',
              'Ocurrio un error al listar los planetas'
            );
          },
        })
    );
  }

  writeValue(id: string): void {
    this.value = id;
    this.planetasControl.patchValue(id, { emitEvent: false });
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
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
