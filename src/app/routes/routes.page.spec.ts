import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RoutesPage } from './routes.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoutesPage', () => {
  let component: RoutesPage;
  let fixture: ComponentFixture<RoutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesPage  ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, CoreModule,  RouterTestingModule.withRoutes([])], 
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
