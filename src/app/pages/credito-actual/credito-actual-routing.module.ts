import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditoActualPage } from './credito-actual.page';

const routes: Routes = [
  {
    path: '',
    component: CreditoActualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditoActualPageRoutingModule {}
