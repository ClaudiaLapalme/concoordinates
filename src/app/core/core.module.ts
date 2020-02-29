import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicModule } from '@ionic/angular';
import {
    IndoorMapComponent,
    ToggleCampusComponent,
    ToggleFloorsComponent,
    SearchComponent
} from './components';
import {
    AbstractPOIFactoryService,
    OutdoorPOIFactoryService,
} from './factories';
import {
    GoogleApisService,
    LocationService,
    MapService,
    PlacesService
} from './services';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(),
    ],
    providers: [
        LocationService,
        MapService,
        NativeGeocoder,
        Geolocation,
        GoogleApisService,
        OutdoorPOIFactoryService,
        AbstractPOIFactoryService,
        PlacesService
    ],
    exports: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        SearchComponent
    ],
    entryComponents: []
})
export class CoreModule { }
