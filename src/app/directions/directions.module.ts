import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DirectionsPage } from './directions.page';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';   // agm-direction

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'directions',
        component: DirectionsPage
      }
    ]),
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyCIzEAynHPfNyyTivoVJxzWjiO9k_uHUoE',
    }),
    AgmDirectionModule,     // agm-direction
  ],
  declarations: [DirectionsPage]
})
export class DirectionsPageModule {}
