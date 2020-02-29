
export class IndoorMap extends google.maps.OverlayView {

    private mapRef: google.maps.Map;
    private divRef: any;

    constructor(
        public bounds: google.maps.LatLngBounds,
        public map: google.maps.Map,
        public div: any) {

        super();

        this.mapRef = map; // Necessary for hide/show behavior
        this.divRef = div; // Necessary for hide/show behavior


    };

    public setup() {
        this.setMap(null);

        // let debug = false; // Change to true when debugging indoorMap placement.
        // this.debug(debug);

        this.setupMapListeners(this.mapRef);
    }

    // Tile lifecycle method
    onAdd() {
        let panes = this.getPanes();
        this.div = this.divRef;
        panes.overlayLayer.appendChild(this.div);
    };

    // Tile lifecycle method
    draw() {
        let overlayProjection = this.getProjection();

        let sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
        let ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());

        this.div.style.left = sw.x + 'px';
        this.div.style.top = ne.y + 'px';
        this.div.style.width = (ne.x - sw.x) + 'px';
        this.div.style.height = (sw.y - ne.y) + 'px';
    };

    // Tile lifecycle method
    onRemove() {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    };

    // For debugging
    updateBounds(bounds) {
        this.bounds = bounds;
        this.draw();
    };

    /**
     * Set up all listeners that the map will have concerning indoor map.
     */
    setupMapListeners(map: google.maps.Map) {

        let _this = this;

        // Zoom Changed Listener
        google.maps.event.addListener(map, 'zoom_changed', function () {
            let newZoom: number = map.getZoom();

            const ZOOM_THRESHOLD = 17;
            if (newZoom <= ZOOM_THRESHOLD) { // hide
                _this.setMap(null);
            } else if (!_this.getMap() && newZoom > ZOOM_THRESHOLD) { // show
                _this.setMap(_this.mapRef);
            }
        });

        // Bounds Changed Listener
        // TODO Setup listener for future removal of toggle from going outside bounds
        // of indoor map bounds
        google.maps.event.addListener(map, 'bounds_changed', function () {
            let mapBounds = map.getBounds();
            // console.log('mapBounds', mapBounds); // the map's bounds
            // console.log('this.bounds', _this.bounds); // constant for the indoorMap
            // https://developers.google.com/maps/documentation/javascript/reference/map#Map.bounds_changed
        });

    }


    // WARNING | DO NOT REMOVE | IMPORTANT FOR DEVELOPMENT
    // /**
    //  * For development purposes to adjust indoorMaps images
    //  * and their bounds easily and correctly.
    //  * 
    //  * @param debug true to enable indoorMap debug mode
    //  */
    // debug(debug: boolean) {
    //     if (debug) {
    //         let markerA = new google.maps.Marker({
    //             position: this.bounds.getSouthWest(),
    //             map: this.map,
    //             draggable: true
    //         });
    //         let markerB = new google.maps.Marker({
    //             position: this.bounds.getNorthEast(),
    //             map: this.map,
    //             draggable: true
    //         });

    //         let _this = this;
    //         // debug
    //         google.maps.event.addListener(markerA, 'drag', function () {

    //             let newPointA = markerA.getPosition();
    //             let newPointB = markerB.getPosition();
    //             let newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
    //             _this.updateBounds(newBounds);
    //         });
    //         // // debug
    //         google.maps.event.addListener(markerB, 'drag', function () {

    //             let newPointA = markerA.getPosition();
    //             let newPointB = markerB.getPosition();
    //             let newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
    //             _this.updateBounds(newBounds);
    //         });
    //         // debug
    //         google.maps.event.addListener(markerA, 'dragend', function () {
    //             let newPointA = markerA.getPosition();
    //             let newPointB = markerB.getPosition();
    //             console.log("point1" + newPointA);
    //             console.log("point2" + newPointB);
    //         });
    //         // debug
    //         google.maps.event.addListener(markerB, 'dragend', function () {
    //             let newPointA = markerA.getPosition();
    //             let newPointB = markerB.getPosition();
    //             console.log("point1" + newPointA);
    //             console.log("point2" + newPointB);
    //         });
    //     }
    // }

    // END WARNING
}