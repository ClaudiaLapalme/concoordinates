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
    SettingsComponent,
    ToggleCampusComponent,
    ToggleFloorsComponent
} from './components';
import { RoutesListItemStepComponent } from './components/routes-list-item-step/routes-list-item-step.component';
import { RoutesListItemComponent } from './components/routes-list-item/routes-list-item.component';
import { TransitLineIndicatorComponent } from './components/transit-line-indicator/transit-line-indicator.component';
import {
    AbstractPOIFactoryService,
    IndoorPOIFactoryService,
    OutdoorPOIFactoryService,
    RouteFactory
} from './factories';
import {
    GoogleApisService,
    LocationService,
    MapService,
    OverlayViewRenderer,
    PlaceService,
    SessionService
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
        SettingsComponent,
        RoutesListItemComponent,
        RoutesListItemStepComponent,
        TransitLineIndicatorComponent
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
        IndoorPOIFactoryService,
        AbstractPOIFactoryService,
        RouteFactory,
        PlaceService,
        OverlayViewRenderer
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
        SettingsComponent,
        RoutesListItemComponent,
        RoutesListItemStepComponent,
        TransitLineIndicatorComponent
    ],
    entryComponents: []
})
export class CoreModule {}
