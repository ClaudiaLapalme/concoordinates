import { ElementRef, Input } from '@angular/core';

export class IndoorMap extends google.maps.OverlayView {
    bounds_: google.maps.LatLngBounds;
    image_: string;
    map_: google.maps.Map<Element>;
    div_: any; // change this



    constructor(
        bounds: google.maps.LatLngBounds,
        image: string,
        map: google.maps.Map,
        div: ElementRef) {

        super();
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;
        this.div_ = div;

        console.log({bounds: this.bounds_, image: this.image_, map: this.map_, div: this.div_});
        this.setMap(map);
    };


    onAdd() {

        console.log('onadd called');
        // let div = document.createElement('div');    // 1 div
        // div.style.borderStyle = 'none';
        // div.style.borderWidth = '0px';
        // div.style.position = 'absolute';

        // let img = document.createElement('img');    // the img
        // img.src = this.image_;
        // img.style.width = '100%';
        // img.style.height = '100%';
        // img.style.opacity = '1.0';
        // img.style.position = 'absolute';

        // div.appendChild(img);   /// div->img

        // this.div_ = div; // set viewchild ref to div

        let panes = this.getPanes();    // get panes from Overlay 
        panes.overlayLayer.appendChild(this.div_); // add the ref
    };

    // actual function overriden from OverlayView
    draw() {
        console.log('draw called');
        // the projection
        let overlayProjection = this.getProjection();

        // get 
        let sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        let ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
        let div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
    };

    // was called by event listeners for updating the bounds
    // based on markers but not anymore
    updateBounds(bounds) {
        this.bounds_ = bounds;
        this.draw();
    };

    onRemove() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    };
}