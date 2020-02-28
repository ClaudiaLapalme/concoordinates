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
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
    declarations: [LoaderComponent],
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
    ],
    exports: [LoaderComponent]
})
export class CoreModule { }
