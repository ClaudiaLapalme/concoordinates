import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import {
    GoogleApisService,
    LocationService,
    MapService,
} from './services';
import { OutdoorPOIFactoryService, AbstractPOIFactoryService } from './factories';
import { RouteFactory } from './factories/route-factory';
import { LoaderComponent } from './components/loader/loader.component';
import { DirectionsButtonComponent } from './components/directions-button/directions-button.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
    declarations: [LoaderComponent, DirectionsButtonComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    providers: [
        LocationService,
        MapService,
        NativeGeocoder,
        Geolocation,
        GoogleApisService,
        OutdoorPOIFactoryService,
        AbstractPOIFactoryService,
        RouteFactory
    ],
    exports: [LoaderComponent, DirectionsButtonComponent]
})
export class CoreModule { }
