export interface IndoorCoordinates {
    [coordinateName: string]: StoredCoordinates;
}

export interface StoredCoordinates {
    lat: string;
    lng: string;
    fN: number;
}