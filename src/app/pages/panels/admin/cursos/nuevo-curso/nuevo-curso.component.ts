import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';
import {
  CCOURSE_CONSTANT,
  CGALAXY_CONSTANT,
  CLANGUAGE_CONSTANT,
} from 'src/app/core/constants/constants';
import {
  ICourse,
  IGalaxy,
  ILanguage,
} from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css'],
})
export class NuevoCursoComponent implements OnInit {
  courses: ICourse[] = CCOURSE_CONSTANT;
  category: IGalaxy[] = CGALAXY_CONSTANT;
  language: ILanguage[] = CLANGUAGE_CONSTANT;

  cursoForm = this.fb.group({
    nombre: [''],
    fechaCreacion: [''],
    precio: [''],
    categoria: [''],
    idiomas: [''],
    tipoCurso: [''],
    descripcion: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onBasicUploadAuto(event: UploadEvent) {}


  saveCurso(){
    console.log(this.cursoForm.value);
  }
}
