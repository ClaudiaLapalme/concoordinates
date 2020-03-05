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
    BuildingInfoComponent,
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
    PlaceService
} from './services';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        BuildingInfoComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        LoaderComponent,
        DirectionsButtonComponent,
        IndoorMapComponent
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
        PlaceService
    ],
    exports: [
        ToggleCampusComponent,
        BuildingInfoComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        LoaderComponent,
        DirectionsButtonComponent,
        IndoorMapComponent
    ],
    entryComponents: []
})
export class CoreModule { }
