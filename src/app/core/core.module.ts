import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import {
    IndoorMapComponent,
    ToggleCampusComponent,
    ToggleFloorsComponent,
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
import { RouteFactory } from './factories/route-factory';
import { LoaderComponent } from './components/loader/loader.component';
import { DirectionsButtonComponent } from './components/directions-button/directions-button.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        LoaderComponent,
        DirectionsButtonComponent
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
        RouteFactory
    ],
    exports: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
        IndoorMapComponent,
        LoaderComponent,
        DirectionsButtonComponent
    ],
    entryComponents: []
})
export class CoreModule { }
