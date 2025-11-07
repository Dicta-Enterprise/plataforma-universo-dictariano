import { InjectionToken } from '@angular/core';
import { CursoRepository } from '../../repositories/managment/curso.repository';

export const CURSO_REPOSITORY = new InjectionToken<CursoRepository>(
  'CursoRepository'
);
