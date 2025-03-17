import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IdiomaManagment } from 'src/app/core/class/managment/managment';
import { createNuevoIdiomaform } from 'src/app/core/forms/managment/idioma.form';
import { IdiomaManagmentService } from 'src/app/core/services/managment/idioma/idioma-managment.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-nuevo-idioma',
  templateUrl: './nuevo-idioma.component.html',
  styleUrls: ['./nuevo-idioma.component.css']
})
export class NuevoIdiomaComponent {
  private subscription: Subscription = new Subscription();
  @Input() idiomaId: string;

  isLoading: boolean = false;
  @Input() isNuevoIdioma: boolean = false;
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshIdioma: EventEmitter<boolean> = new EventEmitter<boolean>();

  idiomaForm: FormGroup = createNuevoIdiomaform(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private readonly idiomaManagmentService: IdiomaManagmentService
  ) { }

  ngOnInit(): void { }

  onShow() {
    // if (this.galaxiaId === '') return;

    // this.isLoading = true;

    // this.subscription.add(
    //   this.galaxiaManagmentService
    //     .obtenerGalaxiaService$(this.galaxiaId)
    //     .pipe(finalize(() => (this.isLoading = false)))
    //     .subscribe({
    //       next: (response) => {
    //         this.galaxiaForm.patchValue(response);
    //       },
    //       error: (error) => {
    //         this.alertService.showError(
    //           'Upss..',
    //           'Ocurrio un error al obtener la galaxia'
    //         );
    //       },
    //     })
    // );
  }

  onHide() {
    this.onHideEmit.emit(false);
    this.clearComponents();
  }

  clearComponents() {
    this.idiomaForm.reset();
  }

  crearGalaxia() {
    // if (this.galaxiaForm.invalid) {
    //   this.alertService.showWarn('Ups..', 'Formulario incompleto');
    //   return;
    // }

    // const galaxia = convertToGalaxiaManagment(this.galaxiaForm);

    // switch (this.galaxiaId) {
    //   case '':
    //     this.guardarGalaxia(galaxia);
    //     break;
    //   default:
    //     this.actualizarGalaxia(galaxia);
    //     break;
    // }
  }

  guardarGalaxia(idioma: IdiomaManagment) {
    // this.isLoading = true;
    // this.subscription.add(
    //   this.galaxiaManagmentService
    //     .crearGalaxiaService$(galaxia)
    //     .pipe(finalize(() => (this.isLoading = false)))
    //     .subscribe({
    //       next: (response) => {
    //         this.alertService.showSuccess(
    //           'Galaxia creada',
    //           'Galaxia creada con exito'
    //         );
    //         this.onHide();
    //         this.refreshGalaxia.emit(true);
    //       },
    //       error: ({ error }) => {
    //         if (Array.isArray(error.message)) {
    //           error.message.forEach((element: string) => {
    //             this.alertService.showError('Ups...', element);
    //           });
    //         } else {
    //           this.alertService.showError('Ups...', error.error || 'Ocurrió un error inesperado');
    //         }
    //         this.alertService.showError('Upss..', 'Ocurrio un error al crear la galaxia');

    //       }
    //     })
    // );
  }

  actualizarGalaxia(idioma: IdiomaManagment) {
    // this.isLoading = true;

    // this.subscription.add(
    //   this.galaxiaManagmentService
    //     .editarGalaxiaService$(galaxia, this.galaxiaId)
    //     .pipe(finalize(() => (this.isLoading = false)))
    //     .subscribe({
    //       next: (response) => {
    //         this.alertService.showSuccess(
    //           'Galaxia actualizada',
    //           'Galaxia actualizada con exito'
    //         );
    //         this.onHide();
    //         this.refreshGalaxia.emit(true);
    //       },
    //       error: ({ error }) => {
    //         if (Array.isArray(error.message)) {
    //           error.message.forEach((element: any) => {
    //             this.alertService.showError('Upss..', element);
    //           });
    //         } else {
    //           this.alertService.showError('Ups...', error.error)
    //         }

    //         this.alertService.showError('Ups..', 'Ocurrio un error al actualizar la galaxia');
    //       },
    //     })
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
