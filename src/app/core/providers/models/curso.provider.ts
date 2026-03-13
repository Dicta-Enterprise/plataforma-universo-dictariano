import { Provider } from '@angular/core';
import { CURSO_REPOSITORY } from '../../tokens/models/curso.token';
import { CursoRepositoryImpl } from '../../infraestructure/models/curso.repository.impl';

export const CUSTOM_CURSO_PROVIDER: Provider[] = [
  {
    provide: CURSO_REPOSITORY,
    useClass: CursoRepositoryImpl,
  },
];
