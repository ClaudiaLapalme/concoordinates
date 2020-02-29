import { IndoorMap } from "./indoor-map";
import { ElementRef } from '@angular/core';

describe('IndoorMap', () => {



    describe('onAdd', () => {

        let swBound = new google.maps.LatLng(45, -70);
        let neBound = new google.maps.LatLng(50, -80);
        let bounds = new google.maps.LatLngBounds(swBound, neBound);

        let indoorMap;

        class MockElementRef extends ElementRef {
            nativeElement = {};
        }
        class MockMap extends google.maps.Map {
            addListener() {
                return null;
            }
        }

        beforeEach(() => {
            let mockMap = new MockMap(null);
            const mapElement = new MockElementRef({});
            indoorMap = new IndoorMap(bounds, mockMap, mapElement);
        });

        it('should create a indoorMap without setup', () => {
            
        });
    });

});