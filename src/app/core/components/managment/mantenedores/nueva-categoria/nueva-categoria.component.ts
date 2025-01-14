import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { createNuevaCategoriaForm } from 'src/app/core/forms/managment/categoria.form';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css'],
})
export class NuevaCategoriaComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  @Input() isNuevaCategoria: boolean = false;
  @Input() categoria: CategoriaManagment = new CategoriaManagment();
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  categoriaForm: FormGroup = createNuevaCategoriaForm(this.fb);

  constructor(private fb: FormBuilder, private alertService: AlertService) {}

  ngOnInit(): void {}

  onShow() {}

  onHide() {
    this.onHideEmit.emit(false);
  }

  crearCategoria() {
    if (this.categoriaForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }
  }

  guardarCategoria(categoria: CategoriaManagment) {}

  actualizarCategoria(categoria: CategoriaManagment) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
