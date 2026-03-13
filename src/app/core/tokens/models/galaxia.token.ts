import { InjectionToken } from '@angular/core';
import { GalaxiaRepository } from '../../repositories/models/galaxia.repository';

export const GALAXIA_REPOSITORY = new InjectionToken<GalaxiaRepository>(
  'GalaxiaRepository'
);
