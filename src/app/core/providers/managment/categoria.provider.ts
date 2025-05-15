import { Provider } from '@angular/core';
import { CATEGORIA_REPOSITORY } from '../../tokens/managment/categoria.token';
import { CategoriaRepositoryImpl } from '../../infraestructure/managment/categoria.repository.impl';

export const CUSTOM_CATEGORIA_PROVIDER: Provider[] = [
  {
    provide: CATEGORIA_REPOSITORY,
    useClass: CategoriaRepositoryImpl,
  },
];
