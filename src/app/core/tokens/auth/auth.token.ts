import { InjectionToken } from '@angular/core';
import { AuthRepository } from '../../repositories/auth/auth.repository';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>(
  'AUTH_REPOSITORY'
);
