import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {  Subscription } from 'rxjs';
import {  PlaceService, SessionService } from '../../services';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    
    /**
     * Defines if the map is set or not
     *
     * @type {boolean}
     */
    @Input() isMapSet?: boolean;

    /**
     * Decides whether or not to show the search icon in the component
     *
     */
    @Input() showSearchIcon = true;

    /**
     * Value of the placeholder
     *
     */
    @Input() placeholder = 'Search';

    /**
     * Sets the color of the search bar
     *
     */
    @Input() colorPrimary = true;

    /**
     * Adds margin to the top of the overlay
     *
     */
    @Input() topMargin = false;

    /**
     * Emits a place result to the parent component
     *
     * @type {EventEmitter<
     *         google.maps.places.PlaceResult
     *     >}
     */
    @Output() placeSelection: EventEmitter<
        google.maps.places.PlaceResult
    > = new EventEmitter<google.maps.places.PlaceResult>();

    /**
     * Emits a cancel event 
     *
     */
    @Output() cancelSelection: EventEmitter<any> = new EventEmitter();

    /**
     * Tells the parent component to show the controls when overlay is not displayed
     *
     */
    @Output() showControls: EventEmitter<any> = new EventEmitter();

    /**
     * Tells the parent component to remove the controls when overlay is  displayed
     *
     */
    @Output() removeControls: EventEmitter<any> = new EventEmitter();

    /**
     * Set to true when user searches
     *
     */
    showSearchOverlay = false;

    /**
     * Set to true during call for text search
     *
     */
    searching = false;

    /**
     * Result from places api
     *
     */
    searchResultsArray: google.maps.places.PlaceResult[];

    /**
     * Set to true when result is found for given input
     *
     */
    resultFound = false;

    /**
     * Form control for the search input
     *
     * @type {FormControl}
     */
    searchInput: FormControl = new FormControl();

    /**
     * Map object to use with places api
     *
     * @type {google.maps.Map}
     */
    map: google.maps.Map;

    /**
     *
     *
     * @private
     * @type {Subscription}
     */
    private subscription: Subscription;

    constructor(
        private placeService: PlaceService,
        private sessionService: SessionService
    ) {}

    ngOnInit() {
        this.subscription = this.searchInput.valueChanges
            .subscribe(() => {
                this.search();
            });
    }

    ngAfterViewInit() {
        // loads the map object
        this.loadMap();
    }

    ngOnDestroy() {
       this.subscription.unsubscribe();
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes.isMapSet && changes.isMapSet.currentValue) {
            // loads map again whenever isMapSet is changed and set to true
            this.loadMap();
        }
    }

    /**
     * Gets the map object 
     *
     */
    loadMap(): void {
        if (this.sessionService.isMapRefSet()) {
            this.map = this.sessionService.getMapRef();
        }
    }
    /**
     * Call searchPOIs function based on input size
     *
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
                this.showSearchOverlay = true;
                this.searchPOIs(input);
                this.removeControls.emit();
            }
        }
    }

    /**
     * Call textSearch function from placeService
     * @param input text input from the user
     */
    async searchPOIs(input: string): Promise<any> {
        this.searching = true;
        try {
            this.placeService
                .textSearch(this.map, input)
                .then((res: google.maps.places.PlaceResult[]) =>
                    this.handleSearchForPOIs(res)
                )
                .catch(error => this.handleSearchForPOIsError(error));
        } catch {
            console.log('Something went wrong, please refresh application.');
        }
    }

    /**
     * Handles valid result received from place service text search function
     * @param res Array of Google PlaceResult objects
     */
    private handleSearchForPOIs(res: google.maps.places.PlaceResult[]): void {
        if (res.length > 0) {
            this.searchResultsArray = res;
            this.resultFound = true;
        } else {
            this.resultFound = false;
        }
        this.searching = false;
    }

    /**
     * Handles any error received from place service text search function
     * @param error Error response
     */
    private handleSearchForPOIsError(error: any): void {
        console.log(error); //debug
        this.resultFound = false;
        this.searching = false;
    }

    /**
     * Restore search bar and
     * @param place Google Place Result Object
     */
    focusPOI(place: google.maps.places.PlaceResult): void {
        this.searchInput.setValue(place.name);
        this.restoreSearchBar();
        this.cancelSelection.emit();
        this.placeSelection.emit(place);
    }

    /**
     * Restores initial state of the search bar and
     * re-displays the home page controls
     */
    restoreSearchBar(): void {
        this.searchResultsArray = [];
        this.showSearchOverlay = false;
        this.searching = false;
        this.showControls.emit();
    }

    /**
     * Resets form input and calls
     * restoreSearchBar function
     */
    cancelSearch(): void {
        this.searchInput.reset();
        this.restoreSearchBar();
        this.cancelSelection.emit();
    }
}
