import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { IonicModule } from '@ionic/angular';

import { DetalleClasesPageRoutingModule } from './detalle-clases-routing.module';

import { DetalleClasesPage } from './detalle-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleClasesPageRoutingModule,
    QRCodeModule
  ],
  declarations: [DetalleClasesPage]
})
export class DetalleClasesPageModule {}
