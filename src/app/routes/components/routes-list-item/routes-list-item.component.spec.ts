import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockData } from 'src/app/shared/test-mock-data';
import { RoutesListItemComponent } from './routes-list-item.component';

describe('RoutesListItemComponent', () => {
  let component: RoutesListItemComponent;
  let fixture: ComponentFixture<RoutesListItemComponent>;

  const mockData = new MockData();
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
    component.route = jasmine.createSpyObj('route', ['computeTotalDuration']);
    spyOn(mockData, 'getTestRoute');
    component.ngOnInit();
    expect(component.route.computeTotalDuration).toHaveBeenCalled();
  });
});
