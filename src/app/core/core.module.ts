import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicModule } from '@ionic/angular';
import {
    IndoorMapComponent,
    ToggleCampusComponent,
    ToggleFloorsComponent,
    DirectionsButtonComponent,
    LoaderComponent,
    LocationButtonComponent,
} from './components';
import {
    AbstractPOIFactoryService,
    OutdoorPOIFactoryService,
    RouteFactory,
} from './factories';
import {
    GoogleApisService,
    LocationService,
    MapService,
    PlaceService,
} from './services';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        LoaderComponent,
        DirectionsButtonComponent,
        IndoorMapComponent,
        LocationButtonComponent,
    ],
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
        RouteFactory,
        PlaceService,
        LocationButtonComponent,
    ],
    exports: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        LoaderComponent,
        DirectionsButtonComponent,
        IndoorMapComponent,
        LocationButtonComponent,
    ],
    entryComponents: []
})
export class CoreModule { }
