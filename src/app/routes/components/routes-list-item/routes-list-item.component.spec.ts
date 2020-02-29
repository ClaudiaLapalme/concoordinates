import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutesListItemComponent } from './routes-list-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockData } from 'src/app/shared/test-mock-data';

describe('RoutesListItemComponent', () => {
  let component: RoutesListItemComponent;
  let fixture: ComponentFixture<RoutesListItemComponent>;

  let mockData = new MockData()
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesListItemComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute route duration', () => {
    component.route = jasmine.createSpyObj('route',['computeTotalDuration'])
    spyOn(mockData,'getTestRoute')
    component.ngOnInit()
    expect(component.route.computeTotalDuration).toHaveBeenCalled()
  })
});
