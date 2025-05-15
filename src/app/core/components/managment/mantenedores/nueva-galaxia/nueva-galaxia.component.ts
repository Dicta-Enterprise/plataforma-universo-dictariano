import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { createNuevaGalaxiaform } from 'src/app/core/forms/managment/galaxias.form';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { convertToGalaxiaManagment } from 'src/app/shared/functions/managment/galaxia.function';
import { GalaxiaFacade } from 'src/app/shared/patterns/facade/managment/galaxia-facade';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/managment/categoria-facade';

export interface ItemImagen {
  file: File;
  categoria: string;
  url: string;
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
  imagenPreviews: ItemImagen[] = [];
  galaxiaForm: FormGroup;
  categorias$ = this.categoriaFacade.categorias$;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private readonly galaxiaFacade: GalaxiaFacade,
    private readonly categoriaFacade: CategoriaFacade
  ) {}

  ngOnInit(): void {
    this.categoriaFacade.listarCategorias();
  }

  onShow() {
    this.galaxiaForm = createNuevaGalaxiaform(
      this.fb,
      this.categorias$.getValue().length
    );

    if (this.galaxiaId === '') return;

    this.galaxiaFacade.obtenerGalaxia(this.galaxiaId);
  }

  get imagenesFormArray(): FormArray {
    return this.galaxiaForm.get('imagenes') as FormArray;
  }

  onFileSelected(event: any, index: number, categoria: CategoriaManagment) {
    const file: File = event.files[0];
    if (!file) return;

    this.imagenesFormArray.at(index).get('imagen')?.setValue(file);


    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreviews[index] = {
        file: file,
        categoria: categoria.id,
        url: reader.result as string,
      };
    };
    reader.readAsDataURL(file);
  }

  crearGalaxia() {
    // if (this.galaxiaForm.invalid) {
    //   this.alertService.showWarn('Ups..', 'Formulario incompleto');
    //   return;
    // }

    console.log("Creando");
    console.log(this.galaxiaForm.getRawValue());
    console.log(this.imagenPreviews);



    const galaxia = convertToGalaxiaManagment(this.galaxiaForm);





    // switch (this.galaxiaId) {
    //   case '':
    //     this.galaxiaFacade.crearGalaxia(galaxia);
    //     break;
    //   default:
    //     this.galaxiaFacade.actualizarGalaxia(galaxia);
    //     break;
    // }
  }

  onHide() {
    this.onHideEmit.emit(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
