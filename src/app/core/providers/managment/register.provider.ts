import { Provider } from '@angular/core';
import { REGISTER_REPOSITORY } from '../../tokens/managment/register.token';
import { RegisterRepositoryImpl } from '../../infraestructure/managment/register.repository.impl';

export const CUSTOM_REGISTER_PROVIDER: Provider[] = [
  {
    provide: REGISTER_REPOSITORY,
    useClass: RegisterRepositoryImpl,
  },
];
