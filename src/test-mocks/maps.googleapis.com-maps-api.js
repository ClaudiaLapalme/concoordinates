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
let google = {
    maps: {
        OverlayView: function() {
            return {
                setMap: function() {}
            };
        },
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
        Map: function(obj) {},
        Size: function() {},
        Polygon: function() {
            return new Polygon();
        },
        DirectionsService: function() {
            return new DirectionsService();
        },
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
                    },
                    getDetails: function() {
                        return ['details'];
                    }
                };
            }
        },
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
