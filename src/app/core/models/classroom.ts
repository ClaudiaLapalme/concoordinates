import { Coordinates } from './coordinates';
import { IndoorPOI } from './indoor-poi';
import { RoomCode } from './roomcode';

export class Classroom extends IndoorPOI {

    private roomCode: RoomCode;
    
    constructor(name: string, coordinates: Coordinates, iconPath: string, roomCode: RoomCode) {
        super(name, coordinates, iconPath);
        this.setRoomCode(roomCode);
    }

    getRoomCode(): RoomCode {
        return this.roomCode;
    }

    setRoomCode(roomCode: RoomCode): void {
        this.roomCode = roomCode;
    }
}
