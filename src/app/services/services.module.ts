import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './map/map.service';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[MapService, NativeGeocoder, Geolocation]
})
export class ServicesModule { }
