import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfigPageRoutingModule } from './config-routing.module';

import { ConfigPage } from './config.page';

import { BtnToTopComponent } from 'src/app/components/btn-to-top/btn-to-top.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPageRoutingModule
  ],
  declarations: [ConfigPage, BtnToTopComponent]
})
export class ConfigPageModule {}
