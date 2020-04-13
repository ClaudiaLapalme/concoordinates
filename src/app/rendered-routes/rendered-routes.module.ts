import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '../core';
import { RouteStepComponent } from './components/route-step/route-step.component';
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
    declarations: [RenderedRoutesPage, RouteStepComponent]
})
export class RenderedRoutesPageModule {}
