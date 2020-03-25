import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import {
    DirectionsButtonComponent,
    IndoorMapComponent,
    LoaderComponent,
    LocationButtonComponent,
    SearchComponent,
    ToggleCampusComponent,
    ToggleFloorsComponent,
    SettingsComponent,
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
    SessionService,
} from './services';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        SearchComponent,
        LoaderComponent,
        DirectionsButtonComponent,
        IndoorMapComponent,
        LocationButtonComponent,
        SettingsComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        IonicStorageModule,
        FormsModule,
        ReactiveFormsModule
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
        ToggleFloorsComponent,
        IndoorMapComponent,
        SearchComponent,
        LoaderComponent,
        DirectionsButtonComponent,
        IndoorMapComponent,
        LocationButtonComponent,
        SettingsComponent
    ],
    entryComponents: []
})
export class CoreModule { }
