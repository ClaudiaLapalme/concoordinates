
export class RoomCode {

    private buildingCode: string;
    private floorCode: string;
    private floorLevel: number;
    private roomNumber: number;
    
    constructor(buildingCode: string, floorCode: string, floorLevel: number, roomNumber: number) {
        this.buildingCode = buildingCode;
        this.floorCode = floorCode;
        this.floorLevel = floorLevel;
        this.roomNumber = roomNumber;
    }
    
    getBuildingCode(): string {
        return this.buildingCode;
    }

    getFloorCode(): string {
        return this.floorCode;
    }

    getFloorLevel(): number {
        return this.floorLevel;
    }

    getRoomNumber(): number {
        return this.roomNumber;
    }

    setBuildingCode(buildingCode: string): void {
        this.buildingCode = buildingCode;
    }

    setFloorCode(floorCode: string): void {
        this.floorCode = floorCode;
    }

    setFloorLevel(floorLevel: number): void {
        this.floorLevel = floorLevel;
    }

    setRoomNumber(roomNumber: number): void {
        this.roomNumber = roomNumber;
    }

    toString(): string {
        return this.buildingCode + this.floorCode + this.roomNumber;
    }



}
