import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ToggleCampusComponent } from './components/toggle-campus/toggle-campus.component';
import { 
    GoogleApisService, 
    LocationService, 
    MapService 
} from './services';
import { ToggleFloorsComponent } from './components/toggle-floors/toggle-floors.component';

@NgModule({
    declarations: [
        ToggleCampusComponent,
        ToggleFloorsComponent,
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
    ],
    entryComponents: []
})
export class CoreModule { }
