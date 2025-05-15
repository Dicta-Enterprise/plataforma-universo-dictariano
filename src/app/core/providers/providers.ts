import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ErrorInterceptor } from 'src/app/shared/interceptors/error.interceptor';
import { CUSTOM_GALAXIA_PROVIDER } from './managment/galaxia.provider';
import { SpinnerInterceptor } from 'src/app/shared/interceptors/spinner.interceptor';
import { CUSTOM_CATEGORIA_PROVIDER } from './managment/categoria.provider';

export const CUSTOM_PROVIDERS: Provider[] = [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: BearerTokenInterceptor,
  //     multi: true,
  //   },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true,
  },

  ...CUSTOM_GALAXIA_PROVIDER,
  ...CUSTOM_CATEGORIA_PROVIDER,
];
