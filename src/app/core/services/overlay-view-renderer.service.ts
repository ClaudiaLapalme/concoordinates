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
}