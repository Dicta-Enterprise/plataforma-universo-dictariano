import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { Profesor } from 'src/app/core/class/models';
import { ProfesorService } from 'src/app/core/services/models/profesor/profesor.service';
import { AlertService } from 'src/app/shared/services/alert.service';

const VALUE_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomProfesorDropdownComponent),
  multi: true,
};


@Component({
  selector: 'app-custom-profesor-dropdown',
  templateUrl: './custom-profesor-dropdown.component.html',
  styleUrls: ['./custom-profesor-dropdown.component.css'],
  providers: [VALUE_ACCESOR],
})
export class CustomProfesorDropdownComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  private subscription: Subscription = new Subscription();
  profesorControl: FormControl;
  isLoading: boolean = false;

  profesores: Profesor[] = [];
  @Input() label: string = 'Seleccione un Profesor';

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };
  isDisabled = false;
  value: string | null = null;

  constructor(
    private alertService: AlertService,
    private profesorService: ProfesorService
  ) {
    this.profesorControl = new FormControl(null);
  }

  ngOnInit(): void {
    this.listarProfesores();
  }

  listarProfesores() {
    this.isLoading = true;
    this.subscription.add(
      this.profesorService.listarProfesoresService$()
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (data) => {
            this.profesores = data.map((profesor) => ({
              ...profesor,
              nombreCompleto: `${profesor.nombre} ${profesor.apellido}`
            }));
            //console.log('',data)
          },
          error: (error) => {
            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al listar de los profesores'
            );
          }
        })
    );
  }

  writeValue(id: string | null): void {
    this.value = id;
    this.profesorControl.setValue(id, {emitEvent: false});
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
