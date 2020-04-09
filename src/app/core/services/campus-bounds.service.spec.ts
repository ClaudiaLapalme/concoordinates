import { TestBed } from '@angular/core/testing';

import { Coordinates } from '../models';
import { CampusBoundsService } from './campus-bounds.service';
import { GoogleApisService } from '../services';


describe('CampusBoundsService', () => {
    let mockGoogleApisService: GoogleApisService;
    let campusBoundsService: CampusBoundsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        mockGoogleApisService = jasmine.createSpyObj('GoogleApisService', [
            'createLatLng', 'computeDistance'
        ]);
        campusBoundsService = new CampusBoundsService(mockGoogleApisService);

    });

    it('should be created', () => {
        expect(campusBoundsService).toBeTruthy();
    });

    describe('isWithinBoundsOfLoyola()', () => {

        it('should return true if distance is less than 2km from Loyola', () => {
            const location = new Coordinates(45.458, -73.640, null);
            (mockGoogleApisService.computeDistance as jasmine.Spy).and.returnValue(101);
            expect(campusBoundsService.isWithinBoundsOfLoyola(location)).toEqual(true);
        })

        it('should not set Loyola\'s campus coordinates if they are already set)', () => {
            campusBoundsService.loyolaCoordinates = new google.maps.LatLng(45.4582, -73.6405);
            const location = new Coordinates(45.4582, -73.6405, null);
            (mockGoogleApisService.computeDistance as jasmine.Spy).and.returnValue(101);
            expect(campusBoundsService.isWithinBoundsOfLoyola(location)).toEqual(true);
        })
        
        it('should return false if fistance is more than 2km from Loyola', () => {
            const location = new Coordinates(45.458, -73.640, null);
            (mockGoogleApisService.computeDistance as jasmine.Spy).and.returnValue(2001);
            expect(campusBoundsService.isWithinBoundsOfLoyola(location)).toEqual(false);

        })
    })

    describe('isWithinBoundsOfSGW()', () => {

        it('should return true if distance is less than 2km from SGW', () => {
            const location = new Coordinates(45.458, -73.640, null);
            (mockGoogleApisService.computeDistance as jasmine.Spy).and.returnValue(101);
            expect(campusBoundsService.isWithinBoundsOfSGW(location)).toEqual(true);
        });

        it('should not set SGW\'s campus coordinates if they are already set)', () => {
            campusBoundsService.sgwCoordinates = new google.maps.LatLng(45.4959053, -73.5801141);
            const location = new Coordinates(45.4959053, -73.5801141, null);
            (mockGoogleApisService.computeDistance as jasmine.Spy).and.returnValue(101);
            expect(campusBoundsService.isWithinBoundsOfSGW(location)).toEqual(true);
        });

        it('should return false if fistance is more than 2km from SGW', () => {
            const location = new Coordinates(45.458, -73.640, null);
            (mockGoogleApisService.computeDistance as jasmine.Spy).and.returnValue(2001);
            expect(campusBoundsService.isWithinBoundsOfSGW(location)).toEqual(false);

        });

    });

    describe('setCampusCoordinates()', () => {
        
        it('should set the loyola campus code correctly', () => {
            (mockGoogleApisService.createLatLng as jasmine.Spy).and.returnValue(new google.maps.LatLng(45.4582, -73.6405));
            campusBoundsService.setCampusCoordinates();
            expect(campusBoundsService.loyolaCoordinates).toEqual(new google.maps.LatLng(45.4582, -73.6405));
        });

        it('should set the SGW campus code correctly', () => {
            (mockGoogleApisService.createLatLng as jasmine.Spy).and.returnValue(new google.maps.LatLng(45.4959053, -73.5801141));
            campusBoundsService.setCampusCoordinates();
            expect(campusBoundsService.sgwCoordinates).toEqual(new google.maps.LatLng(45.4959053, -73.5801141));
        });

    });
});