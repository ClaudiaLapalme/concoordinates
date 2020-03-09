import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenderedRoutesPage } from './rendered-routes.page';

describe('RenderedRoutesPage', () => {
  let component: RenderedRoutesPage;
  let fixture: ComponentFixture<RenderedRoutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderedRoutesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RenderedRoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
