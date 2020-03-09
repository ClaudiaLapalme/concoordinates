import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicPullupModule } from 'ionic-pullup';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BuildingInfoComponent } from './components'; 
import { ConvertToDayOfWeek } from './pipes';

@NgModule({
    imports: [
        SharedModule,
        IonicModule,
        IonicPullupModule,
        HomeRoutingModule,
        CoreModule,
    ],
    declarations: [
        HomePage,
        BuildingInfoComponent,
        ConvertToDayOfWeek
    ]
})
export class  HomeModule {}