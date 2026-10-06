import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { MiFacturacionComponent } from './mi-facturacion/mi-facturacion.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
    children: [
      {
        path: 'mi-informacion',
        loadChildren: () =>
          import('./mi-informacion/mi-informacion.module').then(
            (m) => m.MiInformacionModule
          ),
      },
      {
        path: 'tarjetas-asociadas',
        loadChildren: () =>
          import('./tarjetas-asociadas/tarjetas-asociadas.module').then(
            (m) => m.TarjetasAsociadasModule
          ),
      },
      {
        path: 'mi-facturacion',
        component: MiFacturacionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}