import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Route } from 'src/app/core/models/route';
@Component({
    selector: 'app-routes-list',
    templateUrl: './routes-list.component.html',
    styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {
    @Input() routes: Route[];
    constructor() {}

    ngOnInit() {
        console.log(this.routes);
        
    }
}
