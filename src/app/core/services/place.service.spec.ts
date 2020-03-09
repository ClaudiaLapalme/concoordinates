import { PlaceService } from './place.service';

describe('PlaceService', () => {
    function testServiceSetup() {
        const locationServiceSpy = jasmine.createSpyObj('LocationService', ['getGeoposition']);
        const placeService: PlaceService = new PlaceService(locationServiceSpy);
        return { placeService, locationServiceSpy };
    }

    it('should be created', () => {
        const { placeService } = testServiceSetup();
        expect(placeService).toBeTruthy();
    });

    describe('enableService()', () => {

        class MockMap extends google.maps.Map {
        }

        it('should create the googlePlacesService', () => {
            const { placeService } = testServiceSetup();

            placeService.enableService(new MockMap(null));

            expect(placeService["googlePlacesService"]).toBeDefined();
        });
    });

    describe('displayBuildingInformation()', () => {

        class MockMap extends google.maps.Map {
        }

        const buildingInformation = {
            placeId: "xxxxxx",
            fields: ['formatted_address', 'formatted_phone_number', 'opening_hours', 'website']
          };

        it('should get the details of the building from the Google API', () => {
            const { placeService } = testServiceSetup();

            placeService.enableService(new MockMap(null));

            placeService.displayBuildingInformation(buildingInformation, 'test building', 'test picture');

            expect(placeService["placeResultObservable"]).toBeDefined();
        });
    });
});
