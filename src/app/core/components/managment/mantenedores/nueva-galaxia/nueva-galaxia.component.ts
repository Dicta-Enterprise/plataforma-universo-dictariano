import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { createNuevaGalaxiaform } from 'src/app/core/forms/managment/galaxias.form';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { convertToGalaxiaManagment } from 'src/app/shared/functions/managment/galaxia.function';
import { GalaxiaFacade } from 'src/app/shared/patterns/facade/managment/galaxia-facade';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/managment/categoria-facade';
import { ItemImagen } from 'src/app/core/interfaces/genericas/IItemImagen.interface';
import { AlertService } from 'src/app/shared/services/alert.service';

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

  galaxiaForm: FormGroup = createNuevaGalaxiaform(this.fb);
  categorias$ = this.categoriaFacade.categorias$;

  constructor(
    private fb: FormBuilder,
    private readonly galaxiaFacade: GalaxiaFacade,
    private readonly categoriaFacade: CategoriaFacade,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.categoriaFacade.listarCategorias();
  }

  onShow() {
    if (this.galaxiaId === '') return;

    this.galaxiaFacade.obtenerGalaxia(this.galaxiaId);
  }

  onFileSelected(event: any, index: number, categoria: CategoriaManagment) {
    const file: File = event.files[0];
    if (!file) return;

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
    if (this.galaxiaForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const galaxia = convertToGalaxiaManagment(
      this.galaxiaForm,
      this.imagenPreviews
    );

    
    switch (this.galaxiaId) {
      case '':
        this.galaxiaFacade.crearGalaxia(galaxia);
        break;
      default:
        this.galaxiaFacade.actualizarGalaxia(galaxia);
        break;
    }
  }

  onHide() {
    this.onHideEmit.emit(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
