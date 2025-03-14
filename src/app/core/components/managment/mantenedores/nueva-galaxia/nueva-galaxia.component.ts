import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { createNuevaGalaxiaform } from 'src/app/core/forms/managment/galaxias.form';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GalaxiasManagmentService } from '../../../../services/managment/galaxias/galaxias-managment.service';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';

@Component({
  selector: 'app-nueva-galaxia',
  templateUrl: './nueva-galaxia.component.html',
  styleUrls: ['./nueva-galaxia.component.css']
})
export class NuevaGalaxiaComponent {
private subscription: Subscription = new Subscription();
  @Input() galaxiaId: string;

  isLoading: boolean = false;
  @Input() isNuevaGalaxia: boolean = false;
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshGalaxia: EventEmitter<boolean> = new EventEmitter<boolean>();

  galaxiaForm: FormGroup = createNuevaGalaxiaform(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private readonly galaxiaManagmentService: GalaxiasManagmentService
  ) {}

  ngOnInit(): void {}

  onShow() {
    // if (this.categoriaId === '') return;

    // this.isLoading = true;

    // this.subscription.add(
    //   this.categoriaManagmentService
    //     .obtenerCategoriaService$(this.categoriaId)
    //     .pipe(finalize(() => (this.isLoading = false)))
    //     .subscribe({
    //       next: (response) => {
    //         this.categoriaForm.patchValue(response);
    //       },
    //       error: (error) => {
    //         this.alertService.showError(
    //           'Upss..',
    //           'Ocurrio un error al obtener la categoria'
    //         );
    //       },
    //     })
    // );
  }

  onHide() {
    // this.onHideEmit.emit(false);

    // this.clearComponents();
  }

  clearComponents() {
    // this.categoriaForm.reset();
  }

  crearCategoria() {
    // if (this.categoriaForm.invalid) {
    //   this.alertService.showWarn('Ups..', 'Formulario incompleto');
    //   return;
    // }

    // const categoria = convertToCategoriaManagment(this.categoriaForm);

    // switch (this.categoriaId) {
    //   case '':
    //     this.guardarCategoria(categoria);
    //     break;
    //   default:
    //     this.actualizarCategoria(categoria);
    //     break;
    // }
  }

  guardarGalaxia(galaxia: GalaxiaManagment) {
    // this.isLoading = true;
    // this.subscription.add(
    //   this.categoriaManagmentService
    //     .crearCategoriaService$(categoria)
    //     .pipe(finalize(() => (this.isLoading = false)))
    //     .subscribe({
    //       next: (response) => {
    //         this.alertService.showSuccess(
    //           'Categoria creada',
    //           'Categoria creada con exito'
    //         );
    //         this.onHide();
    //         this.refreshCategoria.emit(true);
    //       },
    //       error: ({ error }) => {
    //         error.message.forEach((element: any) => {
    //           this.alertService.showError('Upss..', element);
    //         });

    //         // this.alertService.showError('Upss..', 'Ocurrio un error al crear la categoria');
    //       },
    //     })
    // );
  }

  actualizarGalaxia(galaxia: GalaxiaManagment) {
    // this.isLoading = true;

    // this.subscription.add(
    //   this.categoriaManagmentService
    //     .editarCategoriaService$(categoria, this.categoriaId)
    //     .pipe(finalize(() => (this.isLoading = false)))
    //     .subscribe({
    //       next: (response) => {
    //         this.alertService.showSuccess(
    //           'Categoria actualizada',
    //           'Categoria actualizada con exito'
    //         );
    //         this.onHide();
    //         this.refreshCategoria.emit(true);
    //       },
    //       error: ({ error }) => {
    //         error.message.forEach((element: any) => {
    //           this.alertService.showError('Upss..', element);
    //         });

    //         this.alertService.showError(
    //           'Upss..',
    //           'Ocurrio un error al actualizar la categoria'
    //         );
    //       },
    //     })
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
