import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appToggleCampus]'
})
export class ToggleCampusDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }
    // // TODO: TYPE it to Coordinates
    // readonly SGW = { lat: 45.4959053, lng: -73.5801141 };
    // readonly LOYOLA = { lat: 45.4582, lng: -73.6405 };

    // currentCenter = this.SGW;

    // constructor(private renderer: Renderer2, private el: ElementRef) { }

    // ngOnInit(): void {

    //     const div = this.renderer.createElement('div');

    //     let toggleSGW = this.renderer.createElement('div');
    //     toggleSGW.id = 'toggleSGW';
    //     toggleSGW.innerHTML = 'SGW';

    //     const nativeElement = this.el.nativeElement;
    //     const parent = nativeElement.parentNode;
    //     this.renderer.insertBefore(parent, div, nativeElement);
    //     this.renderer.appendChild(div, toggleSGW);

    //     // //this creates the wrapping div


    //     // //this creates the second line
    //     // const line2 = this.renderer.createElement('p');
    //     // const text = this.renderer.createText('this is my second');
    //     // this.renderer.appendChild(line2, text);

    //     // const elem = this.el.nativeElement; //this is the element to wrap
    //     // const parent = elem.parentNode; //this is the parent containing el
    //     // this.renderer.insertBefore(parent, div, elem); //here we place div before el

    //     // this.renderer.appendChild(div, elem); //here we place el in div
    //     // this.renderer.appendChild(div, line2); //here we append the second line in div, after el
    // }

}