import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutesListItemStepComponent } from './routes-list-item-step.component';
import { RouteStep, Transport } from 'src/app/core';

describe('RoutesListItemStepComponent', () => {
  let component: RoutesListItemStepComponent;
  let fixture: ComponentFixture<RoutesListItemStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoutesListItemStepComponent],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutesListItemStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should set vehicle type to TEST_TYPE', () => {
    const transportMode: any = 'TRANSIT';
    const transitDetails: any = {
      line: {
        vehicle: {
          type: 'TEST_TYPE'
        }
      }
    }
    const transport = new Transport(null, null, null, transitDetails);
    component.routeTransportMode = transportMode;
    component.step = new RouteStep(null, null, null, null, null, null, transport);
    component.ngOnInit();
    expect(component.vehicleType).toBe('TEST_TYPE');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
