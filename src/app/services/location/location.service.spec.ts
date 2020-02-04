import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[NativeGeocoder]
  }));

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });
});
