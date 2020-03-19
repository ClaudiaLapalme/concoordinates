export enum TransportMode {
    SHUTTLE = 'SHUTTLE',
    TRANSIT = 'TRANSIT',
    DRIVING = 'DRIVING',
    WALKING = 'WALKING',
    BICYCLING = 'BICYCLING'
}

export class Transport {
    constructor(
        speed: number,
        durationFactor: number,
        transportType: TransportMode,
        transportDetails: google.maps.TransitDetails
    ) {
        this.speed = speed;
        this.durationFactor = durationFactor;
        this.travelType = transportType;
        this.transportDetails = transportDetails;
    }

    speed: number;
    durationFactor: number;
    travelType: TransportMode;
    transportDetails: google.maps.TransitDetails;
}
