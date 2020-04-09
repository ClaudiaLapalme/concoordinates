import { TestBed } from '@angular/core/testing';

import { ShuttleService } from './shuttle.service';
import { CampusBoundsService } from './campus-bounds.service';
import { GoogleApisService } from './google-apis.service';

describe('ShuttleService', () => {
    let shuttleService: ShuttleService;
    let mockcampusBoundsService: CampusBoundsService;
    let mockgoogleApisService: GoogleApisService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        mockgoogleApisService = jasmine.createSpyObj('mockGoogleApisService', ['createLatLng', 'createMarker']);
        mockcampusBoundsService = jasmine.createSpyObj('mockcampusBoundsService', ['isWithinBoundsOfLoyola', 'isWithinBoundsOfSGW']);
        shuttleService =  new ShuttleService(mockcampusBoundsService, mockgoogleApisService);


    });

    it('should be created', () => {
        expect(shuttleService).toBeTruthy();
    });
});
