import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, IonInput } from '@ionic/angular';

import { SearchComponent } from './search.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PlaceService } from '../../services';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let placeServiceSpy;
  beforeEach(async(() => {
     placeServiceSpy = jasmine.createSpyObj('PlaceService', ['textSearch']);
    TestBed.configureTestingModule({
      declarations: [SearchComponent,],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PlaceService, useValue: placeServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search()', () => {
    it('should restore search bar when input is empty', () => {
      component.search();
       expect(component.searchResultsArray).toEqual([]);
      expect(component.showOverlay).toBeFalsy();
      expect(component.searching).toBeFalsy();
      //spyOn(component.showControls, 'emit').and.callThrough();
      //fixture.detectChanges();
      //expect(component.showControls).toHaveBeenCalled();
      

    });

    it('should trigger search for POIS', () => {
      let key = "value";
      component.searchInput[key] = "concordia";
      component.search();
      //expect(component.search()).toBeTruthy();s
    });

  });

  describe('searchPOIs()', async() => {
    it('should search for the points of intersts ', () => {
      component.searchPOIs("concordia");
      expect(component.searching).toBeTruthy;
      placeServiceSpy.textSearch.and.returnValue(Promise.resolve("Concordia"));
    });
  });

  describe('handleSearchForPOIs()', () => {
    it('should handle the searching for the points of intersts ', () => {
      let fnName = 'handleSearchForPOIs';
      component[fnName]([]);
      component[fnName](["concordia"]);
      expect(component.searching).toBeFalsy();
    });
  });

  describe('handleSearchForPOIsError()', () => {
    it('should handle errors for the searching points of intersts ', () => {
      let fnName = 'handleSearchForPOIsError';
      component[fnName]([]);
      expect(component.resultFound).toBeFalsy();
      expect(component.searching).toBeFalsy();
    });
  });

  describe('focusPOI()', () => {
    it('should focus on the point of interests', () => { 
      component.focusPOI(PlaceService);
    });
  });

  describe('cancelSearch()', () => {
    it('should cancel the search', () => { 
      component.cancelSearch();
    });
  });


});
