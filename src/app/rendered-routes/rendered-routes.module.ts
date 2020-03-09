import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenderedRoutesPageRoutingModule } from './rendered-routes-routing.module';

import { RenderedRoutesPage } from './rendered-routes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenderedRoutesPageRoutingModule
  ],
  declarations: [RenderedRoutesPage]
})
export class RenderedRoutesPageModule {}
