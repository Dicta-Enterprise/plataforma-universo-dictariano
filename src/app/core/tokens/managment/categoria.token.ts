import { InjectionToken } from '@angular/core';
import { CategoriaRepository } from '../../repositories/managment/categoria.repository';

export const CATEGORIA_REPOSITORY = new InjectionToken<CategoriaRepository>(
  'CategoriaRepository'
);
