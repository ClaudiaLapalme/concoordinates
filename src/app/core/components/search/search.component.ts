import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { PlacesService } from '../../services';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() map: google.maps.Map;
  @Output() placeSelection: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter<google.maps.places.PlaceResult>();

  showOverlay: boolean = false;
  searching: boolean = false;
  searchResultsArray: google.maps.places.PlaceResult[];
  searchValue: string;

  constructor(
    private placesService: PlacesService,
  ) { }

  /**
   * Call searchPOIs function based on input size
   * @param ev event from ionChange in searchbar
   */
  search(ev: any) {
    let input = this.searchValue;

    // Reset search when input is empty
    if (input.length == 0) {
      this.restoreSearchBar();
    } else {

      // Only call search function when input is size 3
      // or larger to help preserve resources (Library is not free)
      if (input.length >= 3) {
        this.showOverlay = true;
        this.searchPOIs(input);
      }

    }
  }

  /**
   * Call textSearch function from placesService
   * @param input text input from the user
   */
  async searchPOIs(input: string) {
    this.searching = true;
    this.placesService.textSearch(this.map, input).then(res => {
      this.searchResultsArray = res;
      this.searching = false;
    })
  }


  /**
   * Empty current searchResults and hide overlay
   * @param place Google Place Result Object
   */

  focusPOI(place: google.maps.places.PlaceResult) {
    this.restoreSearchBar();
    this.placeSelection.emit(place);
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


  ngOnInit() {}



}
