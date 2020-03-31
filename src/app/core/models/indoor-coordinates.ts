export interface IndoorCoordinates {
    [coordinateName: string]: StoredCoordinates;
}

export interface StoredCoordinates {
    lat: string;
    lng: string;
    fN: number;
}

export interface AdjacencyMatrix {
    [coordinateName: string]: Edge;
}

export interface Edge {
    [coordinateName: string]: number;
}