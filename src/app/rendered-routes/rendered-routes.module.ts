import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '../core';
import { RenderedRoutesPageRoutingModule } from './rendered-routes-routing.module';
import { RenderedRoutesPage } from './rendered-routes.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CoreModule,
        RenderedRoutesPageRoutingModule
    ],
    declarations: [RenderedRoutesPage]
})
export class RenderedRoutesPageModule {}
