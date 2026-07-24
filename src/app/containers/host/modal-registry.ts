import { Type } from '@angular/core';
import { TermsConditionsModalComponent } from 'src/app/ui/modals/terms-conditions/terms-conditions-modal.component';

export const MODAL_REGISTRY: Record<string, Type<object>> = {
  termsConditions: TermsConditionsModalComponent,
};