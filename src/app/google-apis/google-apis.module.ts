import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { MapService } from './map.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[MapService, NativeGeocoder, Geolocation ]
})
export class GoogleApisModule { }
