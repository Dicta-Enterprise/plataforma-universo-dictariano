import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { createNuevaCategoriaForm } from 'src/app/core/forms/managment/categoria.form';
import { CategoriaManagmentService } from 'src/app/core/services/managment/categoria/categoria-managment.service';
import { convertToCategoriaManagment } from 'src/app/shared/functions/managment/categoria.function';
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css'],
})
export class NuevaCategoriaComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Input() categoriaId: string;
  selectedFile: File = new File([], '');
  uploadedFiles: any[] = [];
  isLoading: boolean = false;
  categoria: CategoriaManagment = new CategoriaManagment();
  @Input() isNuevaCategoria: boolean = false;
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshCategoria: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  categoriaForm: FormGroup = createNuevaCategoriaForm(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private readonly categoriaManagmentService: CategoriaManagmentService
  ) {}

  ngOnInit(): void {}

  onShow() {
    if (this.categoriaId === '') return;

    this.isLoading = true;

    this.subscription.add(
      this.categoriaManagmentService
        .obtenerCategoriaService$(this.categoriaId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.categoria = response;
            this.categoriaForm.patchValue(response);
          },
          error: (error) => {
            console.log(error);
            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al obtener la categoria'
            );
          },
        })
    );
  }

  onHide() {
    this.onHideEmit.emit(false);

    this.clearComponents();
  }

  clearComponents() {
    this.categoriaForm.reset();
    this.selectedFile = new File([], '');
    this.uploadedFiles = [];
    this.categoria = new CategoriaManagment();
    this.categoriaId = '';
  }

  crearCategoria() {
    if (this.categoriaForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const categoria = convertToCategoriaManagment(this.categoriaForm);

    switch (this.categoriaId) {
      case '':
        this.guardarCategoria(categoria);
        break;
      default:
        this.actualizarCategoria(categoria);
        break;
    }
  }

  guardarCategoria(categoria: CategoriaManagment) {
    this.isLoading = true;
    this.subscription.add(
      this.categoriaManagmentService
        .crearCategoriaService$(categoria, this.selectedFile)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Categoria creada',
              'Categoria creada con exito'
            );
            this.onHide();
            this.refreshCategoria.emit(true);
          },
          error: ({ error }) => {
            this.alertService.showError('Upss..', error.message);
          },
        })
    );
  }

  actualizarCategoria(categoria: CategoriaManagment) {
    this.isLoading = true;

    this.subscription.add(
      this.categoriaManagmentService
        .editarCategoriaService$(categoria, this.categoriaId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Categoria actualizada',
              'Categoria actualizada con exito'
            );
            this.onHide();
            this.refreshCategoria.emit(true);
          },
          error: ({ error }) => {
            error.message.forEach((element: any) => {
              this.alertService.showError('Upss..', element);
            });

            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al actualizar la categoria'
            );
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpload(event: any) {
    if (this.uploadedFiles.length > 0) {
      this.alertService.showWarn(
        'Advertencia',
        'Solo se permite subir un archivo.'
      );
      return;
    }

    this.selectedFile = event.files[0];
    this.uploadedFiles.push(this.selectedFile);
  }

  onBasicUploadAuto(event: any) {
    if (this.uploadedFiles.length > 0) {
      this.alertService.showWarn(
        'Advertencia',
        'Solo se permite subir un archivo.'
      );
      return;
    }

    this.selectedFile = event.files[0];
    this.uploadedFiles.push(this.selectedFile);
  }
}
