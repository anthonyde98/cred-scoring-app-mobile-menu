import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { IonicModule } from '@ionic/angular';
import { PuntajePageRoutingModule } from './puntaje-routing.module';

import { PuntajePage } from './puntaje.page';

import { BtnToTopComponent } from 'src/app/components/btn-to-top/btn-to-top.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntajePageRoutingModule,
    NgCircleProgressModule.forRoot(),
    RoundProgressModule
  ],
  declarations: [PuntajePage, BtnToTopComponent]
})
export class PuntajePageModule {}
