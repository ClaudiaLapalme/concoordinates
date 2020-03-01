import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicModule } from '@ionic/angular';
import {
    IndoorMapComponent,
    ToggleCampusComponent,
    ToggleFloorsComponent,
} from './components';
import { DirectionsButtonComponent } from './components/directions-button/directions-button.component';
import { LoaderComponent } from './components/loader/loader.component';
import {
    AbstractPOIFactoryService,
    OutdoorPOIFactoryService,
} from './factories';
import { RouteFactory } from './factories/route-factory';
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
