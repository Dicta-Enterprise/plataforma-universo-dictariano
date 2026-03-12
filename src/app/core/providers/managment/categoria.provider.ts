import { Provider } from '@angular/core';
import { CATEGORIA_REPOSITORY } from '../../tokens/models/categoria.token';
import { CategoriaRepositoryImpl } from '../../infraestructure/models/categoria.repository.impl';

export const CUSTOM_CATEGORIA_PROVIDER: Provider[] = [
  {
    provide: CATEGORIA_REPOSITORY,
    useClass: CategoriaRepositoryImpl,
  },
];
