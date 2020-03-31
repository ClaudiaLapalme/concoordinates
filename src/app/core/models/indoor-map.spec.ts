import { Coordinates } from './coordinates';
import { IndoorMap } from './indoor-map';
import { IndoorPOI } from './indoor-poi';

describe('IndoorMap', () => {

    const indoorMapLevel = 8;
    const indoorMapBuildingCode = 'h';
    const listOfPOIs = [
        new IndoorPOI('washroom', new Coordinates(1, 1, 8), 'path')
    ];
    let indoorMap;

    class mockIndoorPOI extends IndoorPOI {}
    beforeEach(() => {
        indoorMap = new IndoorMap(
            indoorMapLevel,
            indoorMapBuildingCode,
            listOfPOIs
        );
    });

    it('should create a indoorMap without setup', () => {
        expect(indoorMap).toBeTruthy();
    });

    describe('getPicturePath', () => {

        it('should return the right picturePath', () => {
            const indoorMapPicturePath = indoorMap.getPicturePath();
            const rightPicturePath = "assets/floor_plans/h_8_Beige.png";
            expect( indoorMapPicturePath === rightPicturePath).toBeTruthy();
        });
    });

    describe('createIndoorPOIsLabels', () => {

        class MockMap extends google.maps.Map {}

        it('should call createIndoorPOILabel()', () => {
            indoorMap.listOfPOIs = [
                jasmine.createSpyObj('IndoorPOI', [
                    'createIndoorPOILabel',
                    'removeIndoorPOILabel'
                ])
            ];
            indoorMap.createIndoorPOIsLabels(new MockMap(null));

            expect(indoorMap.listOfPOIs[0].createIndoorPOILabel).toHaveBeenCalled();
        });
    });

    describe('displayIndoorPOIsLabels', () => {

        it('should call displayIndoorPOILabel()', () => {
            indoorMap.listOfPOIs = [
                jasmine.createSpyObj('IndoorPOI', ['displayIndoorPOILabel'])
            ];
            indoorMap.displayIndoorPOIsLabels();

            expect(indoorMap.listOfPOIs[0].displayIndoorPOILabel).toHaveBeenCalled();
        });
    });

    describe('removeIndoorPOIsLabels', () => {

        it('should call removeIndoorPOILabel()', () => {
            indoorMap.listOfPOIs = [
                jasmine.createSpyObj('IndoorPOI', ['removeIndoorPOILabel'])
            ];
            indoorMap.removeIndoorPOIsLabels();

            expect(indoorMap.listOfPOIs[0].removeIndoorPOILabel).toHaveBeenCalled();
        });
    });
});
