import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SiguienteCreditoPageRoutingModule } from './siguiente-credito-routing.module';

import { SiguienteCreditoPage } from './siguiente-credito.page';

import { BtnToTopComponent } from '../../components/btn-to-top/btn-to-top.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SiguienteCreditoPageRoutingModule
  ],
  declarations: [SiguienteCreditoPage, BtnToTopComponent]
})
export class SiguienteCreditoPageModule {}
