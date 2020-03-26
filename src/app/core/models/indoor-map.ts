import { IndoorPOI } from './indoor-poi';

export class IndoorMap extends google.maps.OverlayView {
    private mapRef: google.maps.Map;
    private bounds: google.maps.LatLngBounds;
    private indoorMapPicturePath: string;

    public div: any;
    public currentlySelected: boolean;

    constructor(
        private indoorMapLevel: number,
        private indoorMapBuildingCode: string,
        private listOfPOIs: IndoorPOI[]
    ) {
        super();
        this.indoorMapPicturePath = "assets/floor_plans/" + indoorMapBuildingCode + "_" + indoorMapLevel + "_Beige.png";
    }

    public setup(mapRef: google.maps.Map, divRef: any, bounds: google.maps.LatLngBounds): void {
        this.mapRef = mapRef; // Necessary for hide/show behavior
        this.div = divRef; // Necessary for hide/show behavior
        this.bounds = bounds;

        this.setMap(mapRef);
        this.createIndoorPOIsLabels();
    }

    // Tile lifecycle method
    onAdd(): void {
        const panes = this.getPanes();
        this.div = this.div;
        panes.overlayLayer.appendChild(this.div);
    }

    // Tile lifecycle method
    draw(): void {
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
    onRemove(): void {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }

    // For debugging
    updateBounds(bounds): void {
        this.bounds = bounds;
        this.draw();
    }

    /**
     * Set up all listeners that the map will have concerning indoor map.
     */
    setupMapListeners(map: google.maps.Map) {
        let _this = this;

        // Zoom Changed Listener
        google.maps.event.addListener(map, 'zoom_changed', function () {
            const newZoom: number = map.getZoom();
            const ZOOM_THRESHOLD = 18;
            if (newZoom <= ZOOM_THRESHOLD) {
                // hide
                _this.removeIndoorPOIsLabels();
            } else if (_this.currentlySelected) {
                // show
                _this.displayIndoorPOIsLabels();
            }
        });

        // Bounds Changed Listener
        // TODO Setup listener for future removal of toggle from going outside bounds
        // of indoor map bounds
        google.maps.event.addListener(map, 'bounds_changed', function () {
            const mapBounds = map.getBounds();
            // console.log('mapBounds', mapBounds); // the map's bounds
            // console.log('this.bounds', _this.bounds); // constant for the indoorMap
            // https://developers.google.com/maps/documentation/javascript/reference/map#Map.bounds_changed
        });
    }

    getPicturePath(): string {
        return this.indoorMapPicturePath;
    }

    private createIndoorPOIsLabels(): void {
        for (let indoorPOI of this.listOfPOIs) {
            indoorPOI.createIndoorPOILabel(this.mapRef);
            indoorPOI.removeIndoorPOILabel();
        }
    }

    /**
     * This function is used by the indoor-map component.
     * Prevent to display the indoor POIs when the user toggle the floor
     * at a zoom to low.
     */
    public tryDisplayIndoorPOIsLabels(): void {
        const currentZoom: number = this.mapRef.getZoom();
        const ZOOM_THRESHOLD = 18;
        if (currentZoom >= ZOOM_THRESHOLD) {
            this.displayIndoorPOIsLabels();
        }
    }

    private displayIndoorPOIsLabels(): void {
        for (let indoorPOI of this.listOfPOIs) {
            indoorPOI.displayIndoorPOILabel();
        }
    }

    public removeIndoorPOIsLabels(): void {
        for (let indoorPOI of this.listOfPOIs) {
            indoorPOI.removeIndoorPOILabel();
        }
    }
}
