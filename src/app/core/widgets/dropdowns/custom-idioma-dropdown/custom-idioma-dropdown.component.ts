import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { IdiomaManagment } from 'src/app/core/class/managment/managment';
import { IdiomaManagmentService } from 'src/app/core/services/managment/idioma/idioma-managment.service';
import { AlertService } from 'src/app/shared/services/alert.service';


const VALUE_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomIdiomaDropdownComponent),
  multi: true,
};

@Component({
  selector: 'app-custom-idioma-dropdown',
  templateUrl: './custom-idioma-dropdown.component.html',
  styleUrls: ['./custom-idioma-dropdown.component.css'],
  providers: [VALUE_ACCESOR],
})
export class CustomIdiomaDropdownComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  private subscription: Subscription = new Subscription();
  idiomaControl: FormControl;
  isLoading: boolean = false;

  idiomas: IdiomaManagment[] = [];
  @Input() label: string = 'Seleccione un Idioma';

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };
  isDisabled = false;
  value: string | null = null;

  constructor(
    private alertService: AlertService,
    private idiomaManagmentService: IdiomaManagmentService
  ) {
    this.idiomaControl = new FormControl(null);
  }

  ngOnInit(): void {
    this.listarIdiomas();
  }

  listarIdiomas() {
    this.isLoading = true;
    this.subscription.add(
      this.idiomaManagmentService
        .listarIdiomasService$()
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.idiomas = response;
            //console.log('idiomas', this.idiomas);
          },
          error: (error) => {
            this.alertService.showError(
              'Ups...',
              'Ocurrio un error al listar los idiomas'
            );
          },
        })
    );
  }

  writeValue(id: string | null): void {
    this.value = id;
    this.idiomaControl.setValue(id, {emitEvent: false});
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
