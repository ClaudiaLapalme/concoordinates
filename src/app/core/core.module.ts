import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicModule } from '@ionic/angular';
import {
    IndoorMapComponent,
    ToggleCampusComponent,
    ToggleFloorsComponent,
    SearchComponent,
    DirectionsButtonComponent,
    LoaderComponent,
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
    PlacesService
} from './services';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        SearchComponent,
        LoaderComponent,
        DirectionsButtonComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        FormsModule
    ],
    providers: [
        LocationService,
        MapService,
        NativeGeocoder,
        Geolocation,
        GoogleApisService,
        OutdoorPOIFactoryService,
        AbstractPOIFactoryService,
        PlacesService,
        RouteFactory
    ],
    exports: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        SearchComponent,
        LoaderComponent,
        DirectionsButtonComponent
    ],
    entryComponents: []
})
export class CoreModule { }
