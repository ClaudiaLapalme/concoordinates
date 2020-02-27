import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { CoreModule } from '../core';

@NgModule({
    imports: [
        SharedModule,
        IonicModule,
        HomeRoutingModule,
        CoreModule,
    ],
    declarations: [HomePage]
})
export class HomePageModule { }
