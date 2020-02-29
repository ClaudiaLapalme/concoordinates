import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RoutesPage } from './routes.page';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { CoreModule, TransportMode, RouteFactory, RoutesService } from '../core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoutesPage', () => {
  let component: RoutesPage;
  let fixture: ComponentFixture<RoutesPage>;

  let mockFactory = jasmine.createSpyObj('mockComponent',['generateDefaultRoutes']);
  let mockFormbuilder = jasmine.createSpyObj('mockFormbuilder',['group'])

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

  it('should getRoutes with mode transit if no mode is specified', () => {
    component.setTransportMode(null);
    component.getRoutes();
    expect(component.transportMode).toEqual(TransportMode.TRANSIT);
  });

  it('should generateDefaultRoutes with departAt NOT filled', async () => {
    component.form.value['departAt'] = null
    let componentUnderTest = new RoutesPage(mockFormbuilder,mockFactory);
    componentUnderTest.form = component.form;
    let parsedDate = new Date();
    parsedDate.setHours(18);
    parsedDate.setMinutes(0);
    await componentUnderTest.getRoutes();
    expect(mockFactory.generateDefaultRoutes).toHaveBeenCalled()
    expect(mockFactory.generateDefaultRoutes).toHaveBeenCalledWith(
      componentUnderTest.form.value['from'],
      componentUnderTest.form.value['to'],
      null,
      parsedDate,
      componentUnderTest.transportMode
    )
  })

  it('should call getRoutes() on submit()', () => {
    let componentUnderTest = new RoutesPage(mockFormbuilder,mockFactory);
    spyOn(componentUnderTest,'getRoutes');
    componentUnderTest.submit()
    expect(componentUnderTest.getRoutes).toHaveBeenCalled()
  });
});
