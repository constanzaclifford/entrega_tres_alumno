import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListasPageRoutingModule } from './listas-routing.module';

import { ListaPage } from './listas.page';  // Cambié a 'ListaPage' en vez de 'ListasPage'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListasPageRoutingModule
  ],
  declarations: [ListaPage]  // Cambié de 'ListasPage' a 'ListaPage'
})
export class ListasPageModule {}
