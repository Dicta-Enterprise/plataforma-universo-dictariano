import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize, Subscription } from 'rxjs';
import { ProfesorManagment } from 'src/app/core/class/managment/managment';
import { ProfesorManagmentService } from 'src/app/core/services/managment/profesor/profesor-managment.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  isNuevoProfesor: boolean = false;
  profesores: ProfesorManagment[] = [];
  profesor: ProfesorManagment = new ProfesorManagment();
  profesorAEliminar: ProfesorManagment | null = null;

  buscarProfesorForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private readonly profesorService: ProfesorManagmentService,
    private readonly confirmationService: ConfirmationService,
    private readonly alertService: AlertService,
  ) { }

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
            this.profesores = data;
            console.log('Profesores ', this.profesores);
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

  showNuevoProfesor(event?: boolean) {
    if (event != undefined) {
      this.isNuevoProfesor = event;
      this.profesor = new ProfesorManagment();
      return
    }

    this.isNuevoProfesor = !this.isNuevoProfesor;
  }

  confirmarEliminacion(profesor: ProfesorManagment){
    this.profesorAEliminar = profesor;

    this.confirmationService.confirm({
      message: `¿Seguro que quieres eliminar al Profesor : "${profesor.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-trash',
      rejectButtonStyleClass: 'p-button-danger',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.eliminarCurso();
      },
      reject: () => {
        this.alertService.showInfo('Eliminación cancelada', 'No se eliminó el curso');
        this.profesorAEliminar = null; 
      }
    });

  }

  eliminarCurso() {
    if (!this.profesorAEliminar) return;

    this.profesorService.eliminarProfesorService$(this.profesorAEliminar.id).subscribe({
      next: () => {
        this.alertService.showSuccess('Profesor eliminado', `El Profesor ha sido eliminado correctamente`);
        this.listarProfesores();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        const mensaje = err.error?.message || 'Ocurrió un error al eliminar al Profesor';
        this.alertService.showError('Error', mensaje);
      }
    });

    this.profesorAEliminar = null;
  }

  editarProfesor(profesor: ProfesorManagment) {
    this.profesor = { ...profesor };
    this.showNuevoProfesor();
  }

  clear(table: Table) {
    table.clear();
  }

  calcularEdad(fechaNacimiento: Date): number {
    
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
  
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
  
    return edad;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
