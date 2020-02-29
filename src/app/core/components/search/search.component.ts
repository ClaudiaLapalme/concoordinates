import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlacesService } from '../../services/places.service'; 
import { mapToMapExpression } from '@angular/compiler/src/render3/util';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() map: google.maps.Map;

  showOverlay: boolean;
  searching: boolean;
  searchResultsArray: google.maps.places.PlaceResult[];


  constructor(
    private placesService: PlacesService,
  ) { }

  /**
   * Call searchPOIs function based on input size
   * @param ev event from ionChange in searchbar
   */
  search(ev: any) {
    let input = ev.target.value;

    // Reset search when input is empty
    if (input.length == 0) {
      this.restoreSearchBar();
    } else {

      // Only call search function when input is size 3
      // or larger to help preserve resources (Library is not free)
      if (input.length >= 3) {
        this.searching = true;
        this.showOverlay = true;
        this.searchPOIs(input);
      }

    }
  }

  /**
   * Call textSearch function from placesService
   * @param input text input from the user
   */
  searchPOIs(input: string): void {
    this.placesService.textSearch(this.map, input);
  }


  /**
   * Empty current searchResults and hide overlay
   * @param place Google Place Result Object
   */

  focusPOI(place: google.maps.places.PlaceResult) {
    this.restoreSearchBar();
    this.placesService.createMarker(place, this.map)
  }


  /**
   * Empty current searchResults and hide overlay
   */
  restoreSearchBar(): void {
    console.log('restoring'); // debug
    this.searchResultsArray = [];
    this.showOverlay = false;
    this.searching = false;
  }


  /**
  * OnInit, set searching false, hide overlay div and subscribe 
  * to placesService  function that emits array of PlaceResults
  */
  ngOnInit() {

    this.showOverlay = false;
    this.searching = false;

    this.placesService.searchResultsResolved.subscribe((data) => {
      console.log(data); // debug
      this.searchResultsArray = data;
      this.searching = false;
    });


  }



}
