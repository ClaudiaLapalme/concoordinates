/**
 * This file is used to mock the google api for tests.
 * Please don't delete this file.
 */

class Polygon{

	visible = false;

	setMap(){};
	setVisible(value){
		this.visible = value;
	};
	getVisible(){
		return this.visible;
	};
	addListener(){};
}

class Marker{

	visible = false;

	setMap(){};
	setVisible(value){
	   this.visible = value;
	};
	getVisible(){
		return this.visible;
	};
}

class DirectionsService{
	route(dirRequest, res, status){};
}

class LatLngBounds{
    extend(){};
    getCenter(){};
}

let google = {
    maps : {
        OverlayView : function () {
			return {
				setMap : function () {
				},
			}
        },
        Marker : function () {
			return new Marker;
        },
        InfoWindow : function () {
		},
		LatLng: function(lat, lng){
        	return [lat, lng];
		},
		LatLngBounds: function(sw, ne) {
            return new LatLngBounds
        },
        Map: function(obj){

		},
		Size: function(){

		},
		Polygon: function(){
			return new Polygon;
		},
		DirectionsService: function(){
			return new DirectionsService;
		},
		Animation: {
			DROP: {}
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
					},
					getDetails: function(){
						return ['details'];
					}
    			};	
			}
		},
		event: {
			addListener(){},
			trigger(){
				return ()=>{};
			}
		}
    }
};