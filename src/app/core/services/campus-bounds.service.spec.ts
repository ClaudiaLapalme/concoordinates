import { TestBed } from '@angular/core/testing';

import { CampusBoundsService } from './campus-bounds.service';
import { GoogleApisService } from '../services';


describe('CampusBoundsService', () => {
    let mockGoogleApisService: GoogleApisService;
    let campusBoundsService: CampusBoundsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        mockGoogleApisService = jasmine.createSpyObj('mockGoogleApisService', ['createLatLng']);
        campusBoundsService = new CampusBoundsService(mockGoogleApisService);


    });

    it('should be created', () => {
        expect(campusBoundsService).toBeTruthy();
    });
});
