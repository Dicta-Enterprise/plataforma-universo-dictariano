import { Provider } from '@angular/core';
import { AUTH_REPOSITORY } from '../../tokens/auth/auth.token';
import { AuthRepositoryImpl } from '../../infraestructure/auth/auth.repository.impl';

export const CUSTOM_AUTH_PROVIDER: Provider[] = [
  {
    provide: AUTH_REPOSITORY,
    useClass: AuthRepositoryImpl,
  },
];

