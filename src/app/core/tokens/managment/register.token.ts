import { InjectionToken } from '@angular/core';
import { RegisterRepository } from '../../repositories/managment/register.repository';

export const REGISTER_REPOSITORY = new InjectionToken<RegisterRepository>(
  'REGISTER_REPOSITORY'
);
