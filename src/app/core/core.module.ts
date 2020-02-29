import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import {
    IndoorMapComponent,
    ToggleCampusComponent,
    ToggleFloorsComponent,
    BuildingInfoComponent,
} from './components';
import {
    AbstractPOIFactoryService,
    OutdoorPOIFactoryService,
} from './factories';
import {
    GoogleApisService,
    LocationService,
    MapService,
} from './services';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        BuildingInfoComponent,
        ToggleFloorsComponent,
        IndoorMapComponent
    ],
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
        AbstractPOIFactoryService
    ],
    exports: [
        ToggleCampusComponent,
        BuildingInfoComponent,
        ToggleFloorsComponent,
        IndoorMapComponent
    ],
    entryComponents: []
})
export class CoreModule { }
