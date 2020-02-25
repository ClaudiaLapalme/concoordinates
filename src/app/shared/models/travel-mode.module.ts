enum ETravelMode {
    SHUTTLE,
    TRANSIT,
    DRIVING,
    WALKING,
    BICYCLING
}

export class TravelMode {

    constructor(speed: number, durationFactor: number, travelType: ETravelMode){
        this.speed = speed;
        this.durationFactor = durationFactor;
        this.travelType = travelType;
    }
    
    speed: number;
    durationFactor: number;
    travelType: ETravelMode;
}