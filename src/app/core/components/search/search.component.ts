import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlacesService } from '../../services';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {


  @Input() map: google.maps.Map;
  @Output() placeSelection: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter<google.maps.places.PlaceResult>();
  @Output() cancelSelection: EventEmitter<any> = new EventEmitter();

  showOverlay = false;
  searching = false;
  searchResultsArray: google.maps.places.PlaceResult[];
  searchValue: string;
  resultFound = false;
  constructor(
    private placesService: PlacesService,
  ) { }

  /**
   * Call searchPOIs function based on input size
   * @param ev event from ionChange in searchbar
   */
  search(ev: any) {
    const input = this.searchValue;

    // Reset search when input is empty
    if (input.length === 0) {
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
      if (res.length != 0){
      this.searchResultsArray = res;
      this.resultFound = true;
      }
      else {
        this.resultFound = false;
      }
      this.searching = false;
      console.log(res);
      

    }).catch(error=> {
      console.log(error);
      this.resultFound =false;
      this.searching = false;
    });
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

  /**
   * Restores search bar and emits a cancel event
   *
   */
  cancelSearch() {
    this.restoreSearchBar();
    this.cancelSelection.emit();
  }


  ngOnInit() {}



}
