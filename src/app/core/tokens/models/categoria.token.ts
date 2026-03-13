import { InjectionToken } from '@angular/core';
import { CategoriaRepository } from '../../repositories/models/categoria.repository';

export const CATEGORIA_REPOSITORY = new InjectionToken<CategoriaRepository>(
  'CategoriaRepository'
);
