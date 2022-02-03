import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditoActualPageRoutingModule } from './credito-actual-routing.module';

import { CreditoActualPage } from './credito-actual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditoActualPageRoutingModule
  ],
  declarations: [CreditoActualPage]
})
export class CreditoActualPageModule {}
