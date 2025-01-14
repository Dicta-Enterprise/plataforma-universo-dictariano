import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ProfesorManagment } from 'src/app/core/class/managment/managment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorManagmentService {

  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}



  listarProfesoresService$() {}


  obtenerProfesorService$(id: number) {}


  crearProfesorService$(profesor: ProfesorManagment) {}



  editarProfesorService$(profesor: ProfesorManagment) {}


  eliminarProfesorService$(id: number) {}


  listarDropdownProfesoresService$() {}



}
