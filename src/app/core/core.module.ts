import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IndoorMapComponent } from './components/indoor-map/indoor-map.component';
import { ToggleCampusComponent } from './components/toggle-campus/toggle-campus.component';
import { ToggleFloorsComponent } from './components/toggle-floors/toggle-floors.component';
import {
    GoogleApisService,
    LocationService,
    MapService,
} from './services';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
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
    ],
    exports: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
    ],
    entryComponents: []
})
export class CoreModule { }
