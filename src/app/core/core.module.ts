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
import { OutdoorPOIFactoryService, AbstractPOIFactoryService } from './factories';

@NgModule({
    declarations: [ToggleCampusComponent],
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
    ],
    entryComponents: []
})
export class CoreModule { }
