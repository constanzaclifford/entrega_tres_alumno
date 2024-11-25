import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorizadoGuard } from 'src/app/guards/autorizado.guard';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('../../tabs/perfil/perfil.module').then(m => m.PerfilPageModule),
        canActivate: [AutorizadoGuard]
      },
      
      {
        path: 'home',
        loadChildren: () => import('../../tabs/home/home.module').then(m => m.HomePageModule),
        canActivate: [AutorizadoGuard]
      },
      {
        path: 'mi-clase',
        loadChildren: () => import('../../tabs/mi-clase/mi-clase.module').then( m => m.MiClasePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
