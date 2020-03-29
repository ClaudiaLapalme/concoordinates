import { Injectable } from '@angular/core';
import { Coordinates } from '../models/coordinates';
import { IndoorPOI } from '../models/indoor-poi';
import { Classroom } from '../models/classroom';
import { RoomCode } from '../models/roomcode';
import { Link } from '../models/link';

import IndoorCoordinates from '../data/indoor-poi-to-coordinates.json';

@Injectable()
export class IndoorPOIFactoryService {
    constructor() {}

    /**
     * This function fetchs all the POIs for the floor number given as parameter and returns
     * them as an array. The POIs are stored inside ../data/indoor-poi-to-coordinates.json.
     */
    loadFloorPOIs(floorNumber: number): IndoorPOI[] {
        let floorPOIs = [];

        //Key is the name of one of the POIs inside the indoor-poi-to-coordinates.json
        for (const key of Object.keys(IndoorCoordinates)) {
            let indoorPOI = null;

            if (IndoorCoordinates[key].fN == floorNumber) {
                if (
                    IndoorPOIFactoryService.isCoordinatesFor(key, 'ESC' + (floorNumber + 1) + 'D') ||
                    IndoorPOIFactoryService.isCoordinatesFor(key, 'ESC' + (floorNumber - 1) + 'U')
                ) {
                    continue;
                }

                const poiCoordinates = new Coordinates(
                    IndoorCoordinates[key].lat,
                    IndoorCoordinates[key].lng,
                    floorNumber
                );

                if (IndoorPOIFactoryService.isCoordinatesFor(key, 'WF')) {
                    const iconPath = '../../../assets/icon/WF-indoor.svg';
                    indoorPOI = this.createRegularPOI(
                        key,
                        poiCoordinates,
                        iconPath
                    );
                } else if (IndoorPOIFactoryService.isCoordinatesFor(key, 'BM')) {
                    const iconPath = '../../../assets/icon/BM-indoor.svg';
                    indoorPOI = this.createRegularPOI(
                        key,
                        poiCoordinates,
                        iconPath
                    );
                } else if (IndoorPOIFactoryService.isCoordinatesFor(key, 'BW')) {
                    const iconPath = '../../../assets/icon/BW-indoor.svg';
                    indoorPOI = this.createRegularPOI(
                        key,
                        poiCoordinates,
                        iconPath
                    );
                } else if (IndoorPOIFactoryService.isCoordinatesFor(key, 'E')) {
                    const iconPath = '../../../assets/icon/E-indoor.svg';
                    indoorPOI = this.createLink(
                        key,
                        poiCoordinates,
                        iconPath,
                        'E',
                        []
                    );
                } else if (IndoorPOIFactoryService.isCoordinatesFor(key, 'ESC' + (floorNumber - 1) + 'D')) {
                    const iconPath = '../../../assets/icon/ESC-DOWN-indoor.svg';
                    indoorPOI = this.createLink(
                        key,
                        poiCoordinates,
                        iconPath,
                        'ESC',
                        []
                    );
                } else if (
                    IndoorPOIFactoryService.isCoordinatesFor(key, 'ESC' + (floorNumber + 1) + 'U') ||
                    IndoorPOIFactoryService.isCoordinatesFor(key, 'ESC' + floorNumber + 'U')
                ) {
                    const iconPath = '../../../assets/icon/ESC-UP-indoor.svg';
                    indoorPOI = this.createLink(
                        key,
                        poiCoordinates,
                        iconPath,
                        'ESC',
                        []
                    );
                } else if (IndoorPOIFactoryService.isCoordinatesFor(key, 'OE')) {
                    const iconPath = '../../../assets/icon/OE-indoor.svg';
                    indoorPOI = this.createLink(
                        key,
                        poiCoordinates,
                        iconPath,
                        'ESC',
                        []
                    );
                } else if ( IndoorPOIFactoryService.isCoordinatesFor(key, 'S')) {
                    const iconPath = '../../../assets/icon/S-indoor.svg';
                    indoorPOI = this.createLink(
                        key,
                        poiCoordinates,
                        iconPath,
                        'S',
                        []
                    );
                } else {
                    const iconPath =
                        '../../../assets/icon/TransparentMarker.png';
                    const roomCode = this.createRoomCode(key, floorNumber);
                    indoorPOI = this.createClassroom(
                        key,
                        poiCoordinates,
                        iconPath,
                        roomCode
                    );
                }

                floorPOIs.push(indoorPOI);
            }
        }

        return floorPOIs;
    }

    private createClassroom(name: string, coordinates: Coordinates, iconPath: string, roomCode: RoomCode): IndoorPOI {
        return new Classroom(name, coordinates, iconPath, roomCode);
    }

    private createLink(name: string, coordinates: Coordinates, iconPath: string, linkType: string,exitCoordinates: Coordinates[]): IndoorPOI {
        return new Link(name, coordinates, iconPath, linkType, exitCoordinates);
    }

    private createRegularPOI(name: string, coordinates: Coordinates, iconPath: string): IndoorPOI {
        return new IndoorPOI(name, coordinates, iconPath);
    }

    private createRoomCode(key: string, floorNumber: number): RoomCode {
        const buildingCode = 'H';
        const floorCode = buildingCode + floorNumber.toString();
        const roomNumber = Number(key.substring(1));
        return new RoomCode(buildingCode, floorCode, floorNumber, roomNumber);
    }

    private static isCoordinatesFor(key: string, typePOI: string): boolean {
        const indexOfSubstring = key.indexOf(typePOI);
        if (
            key[indexOfSubstring - 1] === '-' &&
                (
                    key[indexOfSubstring + typePOI.length] === undefined ||
                    !Number.isNaN(Number(key[indexOfSubstring + typePOI.length])) 
                )
        ){
            return true;
        } else {
            return false;
        }
    }
}
