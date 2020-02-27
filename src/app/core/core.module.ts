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
import { RouteFactory } from './services/route-factory';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
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
    ]
})
export class CoreModule { }
