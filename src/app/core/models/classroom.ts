import { Coordinates } from './coordinates';
import { IndoorPOI } from './indoor-poi';
import { RoomCode } from './roomcode';

export class Classroom extends IndoorPOI {

    private roomCode: RoomCode;
    
    constructor(name: string, coordinates: Coordinates, floorNumber: number, roomCode: RoomCode) {
        super(name, coordinates, floorNumber);
        this.roomCode = roomCode;
    }

    getRoomCode(): RoomCode {
        return this.roomCode;
    }

    setRoomCode(roomCode: RoomCode) {
        this.roomCode = roomCode;
    }

}
