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
let google = {
    maps: {
        OverlayView: function() {
            return {
                setMap: function() {}
            };
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
                    }
                };
            }
        },
        // DirectionsService: function() {
        //     return new DirectionsService();
        // },
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
