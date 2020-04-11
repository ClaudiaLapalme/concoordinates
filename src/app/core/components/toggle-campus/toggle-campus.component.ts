import { 
    Component, 
    Output, 
    EventEmitter, 
    Input 
} from '@angular/core';
import { MapService } from '../../services';

enum SelectedCampus {
    NONE = 0,
    SGW = 1,
    LOY = 2
}

@Component({
    selector: 'app-toggle-campus',
    templateUrl: './toggle-campus.component.html',
    styleUrls: ['./toggle-campus.component.scss'],
})
export class ToggleCampusComponent {

    @Output() toggleChange = new EventEmitter();
    
    selectedCampus: SelectedCampus = SelectedCampus.NONE;

    constructor(
        private mapService: MapService
    ) {
        this.mapService.campusSelectedInBoundsObservable.subscribe(
            campusInView => {
                this.campusSelection(campusInView);
            }
        )
     }

     /**
      * Selects a campus if it is on the map
      * Unselects the toggle if neither of the campuses are in view
      * @param campusInView 
      */
    campusSelection(campusInView: number): void {
        if (campusInView === 0) {
            this.selectedCampus = SelectedCampus.NONE;
        }
        else if (campusInView === 1) {
            this.selectedCampus = SelectedCampus.SGW;
        }
        else {
            this.selectedCampus = SelectedCampus.LOY;
        }
    }
    /**
    * Select the SGW campus on click of the button
    */
    selectSGW(): void {
        this.selectedCampus = SelectedCampus.SGW;
        this.toggleChange.emit(SelectedCampus.SGW);
    }

    /**
     * Select the LOY campus on click of the button
     */
    selectLOY(): void {
        this.selectedCampus = SelectedCampus.LOY;
        this.toggleChange.emit(SelectedCampus.LOY);
    }
}
