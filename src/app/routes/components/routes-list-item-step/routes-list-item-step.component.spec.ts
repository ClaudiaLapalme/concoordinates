import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutesListItemStepComponent } from './routes-list-item-step.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
