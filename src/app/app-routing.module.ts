import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'crear-user',
    loadChildren: () => import('./pages/crear-user/crear-user.module').then( m => m.CrearUserPageModule)
  },
  {
    path: 'clases',
    loadChildren: () => import('./pages/clases/clases.module').then( m => m.ClasesPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-clases',
    loadChildren: () => import('./pages/detalle-clases/detalle-clases.module').then( m => m.DetalleClasesPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-perfil',
    loadChildren: () => import('./pages/detalle-perfil/detalle-perfil.module').then( m => m.DetallePerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-justificacion',
    loadChildren: () => import('./pages/detalle-justificacion/detalle-justificacion.module').then( m => m.DetalleJustificacionPageModule)
  },
  {
    path: 'justificacion',
    loadChildren: () => import('./pages/justificacion/justificacion.module').then( m => m.JustificacionPageModule)
  },
  {
    path: 'listas',
    loadChildren: () => import('./pages/listas/listas.module').then( m => m.ListasPageModule)
  }
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
