import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutesPage } from './routes.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoutesListComponent } from './components/routes-list/routes-list.component';
import { CoreModule } from '../core';
import { RoutesListItemComponent } from './components/routes-list-item/routes-list-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RoutesPage', () => {
  let component: RoutesPage;
  let fixture: ComponentFixture<RoutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesPage  ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, CoreModule], 
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
