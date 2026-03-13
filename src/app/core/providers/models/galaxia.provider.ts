import { Provider } from '@angular/core';
import { GalaxiaRepositoryImpl } from '../../infraestructure/models/galaxia.repository.impl';
import { GALAXIA_REPOSITORY } from '../../tokens/models/galaxia.token';

export const CUSTOM_GALAXIA_PROVIDER: Provider[] = [
  {
    provide: GALAXIA_REPOSITORY,
    useClass: GalaxiaRepositoryImpl,
  },
];
