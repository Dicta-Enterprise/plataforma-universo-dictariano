import { InjectionToken } from '@angular/core';
import { CursoRepository } from '../../repositories/models/curso.repository';

export const CURSO_REPOSITORY = new InjectionToken<CursoRepository>(
  'CursoRepository'
);
