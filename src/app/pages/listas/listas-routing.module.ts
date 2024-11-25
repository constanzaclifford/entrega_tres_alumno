import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPage } from './listas.page';  // Cambié de 'ListasPage' a 'ListaPage'

const routes: Routes = [
  {
    path: '',
    component: ListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListasPageRoutingModule {}
