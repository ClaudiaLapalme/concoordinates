import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ToggleCampusComponent } from './components/toggle-campus/toggle-campus.component';
import { ToggleCampusDirective } from './directives';
import { GoogleApisService, LocationService, MapService } from './services';


@NgModule({
    declarations: [ToggleCampusDirective, ToggleCampusComponent],
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
    entryComponents: [ToggleCampusComponent]
})
export class CoreModule { }
