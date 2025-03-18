import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { Estandar } from 'src/app/core/class/estandar/Estandar.class';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { CategoriaManagmentService } from 'src/app/core/services/managment/categoria/categoria-managment.service';
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
  implements OnInit, OnDestroy, ControlValueAccessor {
  private subscription: Subscription = new Subscription();
  categoriaControl: FormControl;
  isLoading: boolean = false;

  categorias: CategoriaManagment[] = [];
  @Input() label: string = 'Seleccione una categoría';

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };
  isDisabled = false;
  value: string | null = null;

  constructor(
    private alertService: AlertService,
    private categoriaManagmentService: CategoriaManagmentService
  ) {
    this.categoriaControl = new FormControl(null);
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this.isLoading = true;
    this.subscription.add(
      this.categoriaManagmentService
        .listarCategoriasService$()
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.categorias = response;
          },
          error: (error) => {
            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al listar las categorias'
            );
          },
        })
    );
  }

  writeValue(id: string | null): void {
    this.value = id;
    this.categoriaControl.setValue(id, {emitEvent: false});
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
