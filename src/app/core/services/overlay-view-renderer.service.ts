import { Injectable } from '@angular/core';

@Injectable()
export class OverlayViewRenderer extends google.maps.OverlayView {
    private bounds: google.maps.LatLngBounds;

    public div: any;

    public setup(mapRef: google.maps.Map, divRef: any, bounds: google.maps.LatLngBounds): void {
        this.div = divRef; // Necessary for hide/show behavior
        this.bounds = bounds;

        this.setMap(mapRef);
    }

    // Tile lifecycle method
    public onAdd(): void {
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(this.div);
    }

    // Tile lifecycle method
    public draw(): void {
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
    public onRemove(): void {
        if (this.div !== null && this.div !== undefined) {
            this.div.parentNode.removeChild(this.div);
        }
    }

    // For debugging
    public updateBounds(bounds): void {
        this.bounds = bounds;
        this.draw();
    }
}