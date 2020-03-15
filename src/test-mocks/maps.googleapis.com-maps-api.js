/**
 * This file is used to mock the google api for tests.
 * Please don't delete this file.
 */

class Polygon {
    visible = false;

    setMap() {}
    setVisible(value) {
        this.visible = value;
    }
    getVisible() {
        return this.visible;
    }
<<<<<<< HEAD
    addListener() {}
}

class Marker {
    visible = false;

    setMap() {}
    setVisible(value) {
        this.visible = value;
    }
    getVisible() {
        return this.visible;
    }
}

class DirectionsService {
    route(dirRequest, res, status) {}
}

class LatLngBounds {
    extend() {}
    getCenter() {}
    setMap() {}
    setVisible(value) {
        this.visible = value;
    }
    getVisible() {
        return this.visible;
    }
}
class DirectionsService {
    route(request, callback) {}
}
class DirectionsRenderer {
    setMap(map) {}
}
=======
}
class DirectionsService {
    route(request, callback) {}
}
class DirectionsRenderer {
    setMap(map) {}
}
class DirectionsRequest {
    constructor(
        destination,
        origin,
        provideRouteAlternatives,
        transitOptions,
        travelMode
    ) {}
}
>>>>>>> ffffbc6a19a0b9bc92329e630d504fe25f512b4f
let google = {
    maps: {
        OverlayView: function() {
            return {
                setMap: function() {}
            };
        },
<<<<<<< HEAD
        Marker: function() {
            return new Marker();
        },
        InfoWindow: function() {},
        LatLng: function(lat, lng) {
            return [lat, lng];
        },
        LatLngBounds: function(sw, ne) {
            return new LatLngBounds();
        },
=======
        Marker: function() {},
        InfoWindow: function() {},
        LatLng: function(lat, lng) {
            return [lat, lng];
        },
        LatLngBounds: function(sw, ne) {
            return null;
        },
>>>>>>> ffffbc6a19a0b9bc92329e630d504fe25f512b4f
        Map: function(obj) {},
        Size: function() {},
        Polygon: function() {
            return new Polygon();
        },
<<<<<<< HEAD
        DirectionsService: function() {
            return new DirectionsService();
        },
=======
>>>>>>> ffffbc6a19a0b9bc92329e630d504fe25f512b4f
        MapTypeId: { ROADMAP: true },
        places: {
            AutocompleteService: function() {},
            PlacesService: function(obj) {
                return {
                    PlacesServiceStatus: {
                        OK: true
                    },
                    textSearch: function(query) {
                        return [];
                    },
                    nearbySearch: function(query) {
                        return [];
<<<<<<< HEAD
                    },
                    getDetails: function() {
                        return ['details'];
=======
>>>>>>> ffffbc6a19a0b9bc92329e630d504fe25f512b4f
                    }
                };
            }
        },
<<<<<<< HEAD
        Marker: function() {},
        InfoWindow: function() {},
        LatLng: function(lat, lng) {
            return [lat, lng];
        },
        LatLngBounds: function(sw, ne) {
            return null;
        },
        Map: function(obj) {},
        Size: function() {},
        Polygon: function() {
            return new Polygon();
        },
        MapTypeId: { ROADMAP: true },
=======
        // DirectionsService: function() {
        //     return new DirectionsService();
        // },
>>>>>>> ffffbc6a19a0b9bc92329e630d504fe25f512b4f
        DirectionsRenderer: function() {
            return new DirectionsRenderer();
        },
        DirectionsRequest: function(
            destination,
            origin,
            provideRouteAlternatives,
            transitOptions,
            travelMode
        ) {
            return new DirectionsRequest(
                destination,
                origin,
                provideRouteAlternatives,
                transitOptions,
                travelMode
            );
        }
    }
};
