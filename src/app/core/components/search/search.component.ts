import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlacesService } from '../../services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() map: google.maps.Map;
  @Output() placeSelection: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter<google.maps.places.PlaceResult>();
  @Output() cancelSelection: EventEmitter<any> = new EventEmitter();
  @Output() showControls: EventEmitter<any> = new EventEmitter();
  @Output() removeControls: EventEmitter<any> = new EventEmitter();

  showOverlay = false;
  searching = false;
  searchResultsArray: google.maps.places.PlaceResult[];
  resultFound = false;
  searchInput: FormControl = new FormControl();
  onDestroy = new Subject<void>();

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(takeUntil(this.onDestroy = new Subject<void>()
      ))
      .subscribe(() => {
        this.search();
      });
  }
  /**
   * Call searchPOIs function based on input size
   * @param ev event from ionChange in searchbar
   */
  search(): void {
    const input = this.searchInput.value;

    // Reset search when input is empty
    if (!input || input.length === 0) {
      this.restoreSearchBar();
    } else {
      // Only call search function when input is size 3
      // or larger to help preserve resources (Library is not free)
      if (input.length >= 3) {
        this.showOverlay = true;
        this.searchPOIs(input);
        this.removeControls.emit();
      }
    }
  }

  /**
   * Call textSearch function from placesService
   * @param input text input from the user
   */
  async searchPOIs(input: string) {
    this.searching = true;
    this.placesService
      .textSearch(this.map, input)
      .then((res: google.maps.places.PlaceResult[]) => this.handleSearchForPOIs(res))
      .catch(error => this.handleSearchForPOIsError(error));
  }

  private handleSearchForPOIs(res: google.maps.places.PlaceResult[]): void {
    if (res.length > 0) {
      this.searchResultsArray = res;
      this.resultFound = true;
    } else {
      this.resultFound = false;
    }
    this.searching = false;
  }

  private handleSearchForPOIsError(error: any): void {
    console.log(error);
    this.resultFound = false;
    this.searching = false;
  }

  /**
   * Empty current searchResults and hide overlay
   * @param place Google Place Result Object
   */

  focusPOI(place: google.maps.places.PlaceResult) {
    this.restoreSearchBar();
    this.cancelSelection.emit();
    this.placeSelection.emit(place);
  }

  /**
   * Empty current searchResults and hide overlay
   */
  restoreSearchBar(): void {
    this.searchResultsArray = [];
    this.showOverlay = false;
    this.searching = false;
    this.showControls.emit();
  }

  /**
   * Restores search bar and emits a cancel event
   *
   */
  cancelSearch() {
    this.searchInput.reset();
    this.restoreSearchBar();
    this.cancelSelection.emit();
  }
}
