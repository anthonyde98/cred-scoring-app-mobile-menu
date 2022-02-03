import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiguienteCreditoPage } from './siguiente-credito.page';

const routes: Routes = [
  {
    path: '',
    component: SiguienteCreditoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiguienteCreditoPageRoutingModule {}
