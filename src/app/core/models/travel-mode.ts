enum TransportMode {
    SHUTTLE,
    TRANSIT,
    DRIVING,
    WALKING,
    BICYCLING
}

export class Transport {

    constructor(speed: number, durationFactor: number, travelType: TransportMode){
        this.speed = speed;
        this.durationFactor = durationFactor;
        this.travelType = travelType;
    }
    
    speed: number;
    durationFactor: number;
    travelType: TransportMode;
}