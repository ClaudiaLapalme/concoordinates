import { Injectable } from '@angular/core';
import { Coordinates } from '../models/coordinates';
import { IndoorPOI } from '../models/indoor-poi';
import { Classroom } from '../models/classroom';
import { RoomCode } from '../models/roomcode';
import { Link } from '../models/link';

import IndoorCoordinates from '../data/indoor-poi-to-coordinates.json';

@Injectable()
export class IndoorPOIFactoryService {

    constructor() { }

    loadFloorPOIs(floorNumber: number): IndoorPOI[] {

        let floorPOIs = [];

        for (const key of Object.keys(IndoorCoordinates)) {

            let indoorPOI = null;

            if (IndoorCoordinates[key].fN == floorNumber) {

                if (key.indexOf('E' + (floorNumber + 1) + 'D') > -1
                                 ||  key.indexOf('E' + (floorNumber - 1) + 'U') > -1 ) {
                    continue;
                } 

                const poiCoordinates = new Coordinates(
                    IndoorCoordinates[key].lat,
                    IndoorCoordinates[key].lng,
                    floorNumber);

                if (key.indexOf('WF') > -1) {
                    const iconPath = '../../../assets/icon/WF-indoor.svg';
                    indoorPOI = this.createRegularPOI(key, poiCoordinates, iconPath)
                } else if (key.indexOf('BM') > -1) {
                    const iconPath = '../..//assets/icon/BM-indoor.svg';
                    indoorPOI = this.createRegularPOI(key, poiCoordinates, iconPath)
                } else if (key.indexOf('BW') > -1) {
                    const iconPath = '../..//assets/icon/BW-indoor.svg';
                    indoorPOI = this.createRegularPOI(key, poiCoordinates, iconPath)
                } else if (key.indexOf('E') === key.length - 1) {
                    const iconPath = '../../../assets/icon/E-indoor.svg';
                    indoorPOI = this.createLink(key, poiCoordinates, iconPath, 'E', [])
                } else if (key.indexOf('E' + (floorNumber - 1) + 'D') > -1 ) {
                    const iconPath = '../../../assets/icon/ESC-DOWN-indoor.svg';
                    indoorPOI = this.createLink(key, poiCoordinates, iconPath, 'ESC', [])
                } else if (key.indexOf('E' + (floorNumber + 1) + 'U') > -1 ) {
                    const iconPath = '../../../assets/icon/ESC-UP-indoor.svg';
                    indoorPOI = this.createLink(key, poiCoordinates, iconPath, 'ESC', [])
                } else if (key.indexOf('S') > -1) {
                    const iconPath = '../../../assets/icon/S-indoor.svg';
                    indoorPOI = this.createLink(key, poiCoordinates, iconPath, 'S', [])
                } else {
                    const iconPath = '../../../assets/icon/TransparentMarker.png';
                    const roomCode = this. createRoomCode();
                    indoorPOI = this.createClassroom(key, poiCoordinates, iconPath, roomCode);
                }
                
                floorPOIs.push(indoorPOI);
            }
        }

        return floorPOIs;
    }

    
    private createClassroom(name: string, coordinates: Coordinates, iconPath: string, roomCode: RoomCode): IndoorPOI {
        return new Classroom(name, coordinates, iconPath, roomCode);
    }

    private createLink(name: string, coordinates: Coordinates, iconPath: string, linkType: string, exitCoordinates: Coordinates[]): IndoorPOI {
        return new Link(name, coordinates, iconPath, linkType, exitCoordinates);
    }

    private createRegularPOI(name: string, coordinates: Coordinates, iconPath: string): IndoorPOI {
        return new IndoorPOI (name, coordinates, iconPath);
    }

    private createRoomCode(): RoomCode {
        return new RoomCode(null, null, null, null);
    }
}
