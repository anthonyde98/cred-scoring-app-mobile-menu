import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule, Routes } from '@angular/router';

const routes: Routes = sessionStorage['auth_token'] == null && sessionStorage['access_token'] == null ? 
[
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
] : 
[
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'puntaje',
    loadChildren: () => import('./pages/puntaje/puntaje.module').then( m => m.PuntajePageModule)
  },
  {
    path: 'credito-actual',
    loadChildren: () => import('./pages/credito-actual/credito-actual.module').then( m => m.CreditoActualPageModule)
  },
  {
    path: 'siguiente-credito',
    loadChildren: () => import('./pages/siguiente-credito/siguiente-credito.module').then( m => m.SiguienteCreditoPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./pages/config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: '**',
    redirectTo: 'informacion',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
