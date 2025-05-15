import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { createNuevaGalaxiaform } from 'src/app/core/forms/managment/galaxias.form';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { convertToGalaxiaManagment } from 'src/app/shared/functions/managment/galaxia.function';
import { CategoriaManagmentService } from 'src/app/core/services/managment/categoria/categoria-managment.service';
import { GalaxiaFacade } from 'src/app/shared/patterns/facade/managment/galaxia-facade';

export interface ItemImagen {
  imagen: File;
  categoria: string;
}

@Component({
  selector: 'app-nueva-galaxia',
  templateUrl: './nueva-galaxia.component.html',
  styleUrls: ['./nueva-galaxia.component.css'],
})
export class NuevaGalaxiaComponent {
  private subscription: Subscription = new Subscription();
  @Input() galaxiaId: string;

  isLoading: boolean = false;
  @Input() isNuevaGalaxia: boolean = false;
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshGalaxia: EventEmitter<boolean> = new EventEmitter<boolean>();

  categorias: CategoriaManagment[] = [];
  imagenPreviews: ItemImagen[] = [];

  galaxiaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private readonly categoriaManagmentService: CategoriaManagmentService,
    private readonly galaxiaFacade: GalaxiaFacade
  ) {}

  ngOnInit(): void {
    this.listarCategorias();

    this.subscription.add(
      this.galaxiaFacade.galaxia$.subscribe({
        next: (response) => {
          this.galaxiaForm.patchValue(response);
        },
      })
    );
  }

  listarCategorias() {
    this.subscription.add(
      this.categoriaManagmentService.listarCategoriasService$().subscribe({
        next: (response) => {
          this.categorias = response;
          this.galaxiaForm = createNuevaGalaxiaform(
            this.fb,
            this.categorias.length
          );
        },
        error: () => {
          this.alertService.showError(
            'Upss..',
            'Ocurrió un error al obtener las categorías'
          );
        },
      })
    );
  }

  onShow() {
    if (this.galaxiaId === '') return;

    this.galaxiaFacade.obtenerGalaxia(this.galaxiaId);
  }

  get imagenesFormArray(): FormArray {
    return this.galaxiaForm.get('imagenes') as FormArray;
  }

  onFileSelected(event: any, index: number, categoria: CategoriaManagment) {
    const file: File = event.files[0];
    if (!file) return;

    // Guarda la imagen en el FormArray
    this.imagenesFormArray.at(index).get('imagen')?.setValue(file);

    // Opcional: Mostrar preview de imagen
    const reader = new FileReader();
    reader.onload = () => {
      // this.imagenPreviews[index] = reader.result as string;
      this.imagenPreviews[index] = {
        imagen: file,
        categoria: categoria.nombre,
      };
    };
    reader.readAsDataURL(file);
  }

  onHide() {
    this.onHideEmit.emit(false);
  }

  crearGalaxia() {
    if (this.galaxiaForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const galaxia = convertToGalaxiaManagment(this.galaxiaForm);

    switch (this.galaxiaId) {
      case '':
        this.galaxiaFacade.crearGalaxia(galaxia);
        break;
      default:
        this.galaxiaFacade.actualizarGalaxia(galaxia);
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
