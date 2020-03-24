import { Coordinates } from './coordinates';
import { IndoorMap } from './indoor-map';
import { IndoorPOI } from './indoor-poi';

describe('IndoorMap', () => {
    describe('onAdd', () => {
        const bounds = 8;
        const indoorMapBuildingCode = 'h';
        const listOfPOIs = [
            new IndoorPOI('washroom', new Coordinates(1, 1, 8), 'path')
        ];
        let indoorMap;

        class mockIndoorPOI extends IndoorPOI {}
        beforeEach(() => {
            indoorMap = new IndoorMap(
                bounds,
                indoorMapBuildingCode,
                listOfPOIs
            );
        });

        it('should create a indoorMap without setup', () => {});
    });
});
