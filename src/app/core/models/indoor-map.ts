import IndoorCoordinates from '../data/indoor-poi-to-coordinates.json';

export class IndoorMap extends google.maps.OverlayView {
    private mapRef: google.maps.Map;
    private divRef: any;

    constructor(
        public bounds: google.maps.LatLngBounds,
        public map: google.maps.Map,
        public div: any
    ) {
        super();

        this.mapRef = map; // Necessary for hide/show behavior
        this.divRef = div; // Necessary for hide/show behavior
    }

    public setup() {
        this.setMap(null);

        const debug = true; // Change to true when debugging indoorMap placement.
        this.debug(debug);

        this.setupMapListeners(this.mapRef);
    }

    // Tile lifecycle method
    onAdd() {
        const panes = this.getPanes();
        this.div = this.divRef;
        panes.overlayLayer.appendChild(this.div);
    }

    // Tile lifecycle method
    draw() {
        const overlayProjection = this.getProjection();

        const sw = overlayProjection.fromLatLngToDivPixel(
            this.bounds.getSouthWest()
        );
        const ne = overlayProjection.fromLatLngToDivPixel(
            this.bounds.getNorthEast()
        );

        this.div.style.left = sw.x + 'px';
        this.div.style.top = ne.y + 'px';
        this.div.style.width = ne.x - sw.x + 'px';
        this.div.style.height = sw.y - ne.y + 'px';
    }

    // Tile lifecycle method
    onRemove() {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }

    // For debugging
    updateBounds(bounds) {
        this.bounds = bounds;
        this.draw();
    }

    /**
     * Set up all listeners that the map will have concerning indoor map.
     */
    setupMapListeners(map: google.maps.Map) {
        let _this = this;

        // Zoom Changed Listener
        google.maps.event.addListener(map, 'zoom_changed', function() {
            const newZoom: number = map.getZoom();

            const ZOOM_THRESHOLD = 17;
            if (newZoom <= ZOOM_THRESHOLD) {
                // hide
                _this.setMap(null);
            } else if (!_this.getMap() && newZoom > ZOOM_THRESHOLD) {
                // show
                _this.setMap(_this.mapRef);
            }
        });

        // Bounds Changed Listener
        // TODO Setup listener for future removal of toggle from going outside bounds
        // of indoor map bounds
        google.maps.event.addListener(map, 'bounds_changed', function() {
            const mapBounds = map.getBounds();
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
    debug(debug: boolean) {
        if (debug) {
            // For indoor maps adjustment
            let _this = this;

            const markerA = new google.maps.Marker({
                position: this.bounds.getSouthWest(),
                map: _this.mapRef,
                draggable: true
            });
            const markerB = new google.maps.Marker({
                position: this.bounds.getNorthEast(),
                map: _this.mapRef,
                draggable: true
            });

            // // debug
            // google.maps.event.addListener(markerA, 'drag', function () {

            //     const newPointA = markerA.getPosition();
            //     const newPointB = markerB.getPosition();
            //     const newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
            //     _this.updateBounds(newBounds);
            // });
            // // // debug
            // google.maps.event.addListener(markerB, 'drag', function () {

            //     const newPointA = markerA.getPosition();
            //     const newPointB = markerB.getPosition();
            //     const newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
            //     _this.updateBounds(newBounds);
            // });
            // // debug
            // google.maps.event.addListener(markerA, 'dragend', function () {
            //     const newPointA = markerA.getPosition();
            //     const newPointB = markerB.getPosition();
            //     console.log('point1' + newPointA);
            //     console.log('point2' + newPointB);
            // });
            // // debug
            // google.maps.event.addListener(markerB, 'dragend', function () {
            //     const newPointA = markerA.getPosition();
            //     const newPointB = markerB.getPosition();
            //     console.log('point1' + newPointA);
            //     console.log('point2' + newPointB);
            // });

            // For getting coordinates
            const coordinateMarker = new google.maps.Marker({
                position: new google.maps.LatLng(45.49735204, -73.57918574),
                draggable: true,
                map: _this.mapRef
            });
            google.maps.event.addListener(coordinateMarker, 'dragend', function(
                evt
            ) {
                const lat = evt.latLng.lat().toFixed(8);
                const lng = evt.latLng.lng().toFixed(8);
                const coord = { lat, lng, fN: 8 };
                console.log(JSON.stringify(coord));
            });

            const testMarker = new google.maps.Marker({
                position: new google.maps.LatLng(45.49734828, 45.49734828),
                draggable: false,
                map: _this.mapRef
            });

            // Putting all coordinates on the map for H 8
            const markers = {};
            if (true) {
                for (const key of Object.keys(IndoorCoordinates)) {

                    let iconPath = null;
                    let labelName = null;
                    const lat: number = IndoorCoordinates[key].lat;
                    const lng: number = IndoorCoordinates[key].lng;
                    const fN: number = IndoorCoordinates[key].fN;

                    if (key.indexOf('E' + (fN + 1) + 'D') > -1 || key.indexOf('E' + (fN - 1) + 'U') > -1 ) {
                        continue;
                    }

                    if (key.indexOf('WF') > -1) {
                        iconPath = '../../../assets/icon/WF-indoor.svg';
                    } else if (key.indexOf('BM') > -1) {
                        iconPath = '../..//assets/icon/BM-indoor.svg';
                    } else if (key.indexOf('BW') > -1) {
                        iconPath = '../..//assets/icon/BW-indoor.svg';
                    } else if (key.indexOf('E') === key.length - 1) {
                        iconPath = '../../../assets/icon/E-indoor.svg';
                    } else if (key.indexOf('E' + (fN - 1) + 'D') > -1 ) {
                        iconPath = '../../../assets/icon/ESC-DOWN-indoor.svg';
                    } else if (key.indexOf('E' + (fN + 1) + 'U') > -1 ) {
                        iconPath = '../../../assets/icon/ESC-UP-indoor.svg';
                    } else if (key.indexOf('S') > -1) {
                        iconPath = '../../../assets/icon/S-indoor.svg';
                    } else {
                        iconPath = '../../../assets/icon/TransparentMarker.png';
                        labelName = key;
                    }

                    if (fN.toString() === '8') {
                        markers[key] = new google.maps.Marker({
                            position: new google.maps.LatLng(lat, lng),
                            draggable: false,
                            map: _this.mapRef,
                            icon: iconPath,
                            label: labelName
                        });
                    }
                }
            }
            function toCoord(key: string): { lat: number; lng: number } {
                return {
                    lat: +IndoorCoordinates[key].lat,
                    lng: +IndoorCoordinates[key].lng
                };
            }
            // console.log(toCoord('H831'));
            // console.log({ lat: 45.49717531, lng: -73.57944189 });
            // const path = [
            //     toCoord('H831'),
            //     toCoord('H8-W30'),
            //     toCoord('H8-W32'),
            //     toCoord('H8-W33'),
            //     toCoord('H8-W34'),
            //     toCoord('H8-W38'),
            //     toCoord('H8-W39'),
            //     toCoord('H8-E7D')
            // ];
            // if (false) {
            //     const polyline = new google.maps.Polyline({
            //         path,
            //         geodesic: true,
            //         strokeColor: '#FF0000',
            //         strokeOpacity: 1.0,
            //         strokeWeight: 2,
            //         map: _this.mapRef
            //     });
            // }
        }
    }

    // END WARNING
}
