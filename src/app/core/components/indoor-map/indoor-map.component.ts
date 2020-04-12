import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import { MapService } from '../../services';
import { IndoorMap, Building } from '../../models'
import { OverlayViewRenderer } from '../../services/overlay-view-renderer.service';

@Component({
    selector: 'app-indoor-map',
    templateUrl: './indoor-map.component.html',
    styleUrls: ['./indoor-map.component.scss']
})
export class IndoorMapComponent implements AfterViewInit {
    readonly swBound = new google.maps.LatLng(
        45.49681658032052,
        -73.57955563558198
    );
    readonly eBound = new google.maps.LatLng(
        45.49771707945049,
        -73.57833170552253
    );

    private bounds = new google.maps.LatLngBounds(this.swBound, this.eBound);
    private currentlyDisplayedIndoorMap: IndoorMap;

    public indoorMaps: Record<number, IndoorMap> = {};
    public indoorMapPicturePath: string =
        '../../../assets/icon/TransparentMarker.png';

    @Input() map: google.maps.Map; // map reference
    @Input() indoorMapLevel: number;
    @Input() indoorMapBuildingCode: string;

    @ViewChild('indoorMapDiv', { read: ElementRef, static: false })
    indoorMapDiv: ElementRef; // html div reference

    constructor(private mapService: MapService,
                private overlayViewRenderer: OverlayViewRenderer) {
        this.setIndoorMaps();
    }

    /**
     * Setting up the Google overlay and markers for each indoormap.
     */
    ngAfterViewInit() {

        this.overlayViewRenderer.setup(
            this.map,
            this.indoorMapDiv.nativeElement,
            this.bounds
        );

        this.setupMapListeners(this.map);
    }

    ngOnChanges() {
        if (this.currentlyDisplayedIndoorMap) {
            this.currentlyDisplayedIndoorMap.removeIndoorLabels();
        }
        if (this.indoorMapLevel) {
            this.currentlyDisplayedIndoorMap = this.indoorMaps[this.indoorMapLevel];
            this.indoorMapPicturePath = this.currentlyDisplayedIndoorMap.getPicturePath();
            this.tryDisplayIndoorLabels();
        }
    }

    private setIndoorMaps(): void {
        const outdoorMap = this.mapService.getOutdoorMap();
        const hBuilding = <Building> outdoorMap.getPOI('Henry F. Hall Building');
        this.indoorMaps = hBuilding.getIndoorMaps();
    }

    /**
     * Set up all listeners that the map will have concerning indoor map.
     */
    private setupMapListeners(map: google.maps.Map) {
        const _this = this;
        // Zoom Changed Listener
        google.maps.event.addListener(map, 'zoom_changed', function () {
            if (_this.currentlyDisplayedIndoorMap) {
                const newZoom: number = map.getZoom();
                const ZOOM_THRESHOLD = 18;
                if (newZoom <= ZOOM_THRESHOLD) {
                    // hide
                    _this.currentlyDisplayedIndoorMap.removeIndoorLabels();
                } else {
                    // show
                    _this.currentlyDisplayedIndoorMap.displayIndoorLabels();
                }
            }
        });
    }

    /**
     * This function is used by the indoor-map component.
     * Prevent to display the indoor POIs when the user toggle the floor
     * at a zoom to low.
     */
    private tryDisplayIndoorLabels(): void {
        const currentZoom: number = this.map.getZoom();
        const ZOOM_THRESHOLD = 18;
        if (currentZoom >= ZOOM_THRESHOLD) {
            this.currentlyDisplayedIndoorMap.displayIndoorLabels();
        }
    }
}
