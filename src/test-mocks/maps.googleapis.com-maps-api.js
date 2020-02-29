/**
 * This file is used to mock the google api for tests.
 * Please don't delete this file.
 */



 
var google = {
    maps : {
        OverlayView : function () {
			return {
				setMap : function () {
				},
			}
        },
        Marker : function () {
        },
        InfoWindow : function () {
        },
        LatLng: function(lat, lng){
        	return [lat, lng];
		},
		LatLngBounds: function(sw, ne) {
			return null;
		},
        Map: function(obj){

		},
		Size: function(){

		},
        MapTypeId: {ROADMAP: true},
        places: {
        	AutocompleteService: function(){

        	},
    		PlacesService: function(obj){
    			return {
    				PlacesServiceStatus: {
	        			OK: true
	        		},
	        		textSearch: function(query){
	        			return [];
	        		},
	        		nearbySearch: function(query){
	        			return [];
	        		}
    			};	
    		}
        }
    }
};