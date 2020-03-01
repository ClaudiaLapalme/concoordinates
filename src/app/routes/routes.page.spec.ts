import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CoreModule, TransportMode } from '../core';
import { RoutesPage } from './routes.page';

describe('RoutesPage', () => {
    let component: RoutesPage;
    let fixture: ComponentFixture<RoutesPage>;

    const mockFactory = jasmine.createSpyObj('mockComponent', ['generateDefaultRoutes']);
    const mockFormbuilder = jasmine.createSpyObj('mockFormbuilder', ['group']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoutesPage],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, CoreModule, RouterTestingModule.withRoutes([])],
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
        component.form.value['departAt'] = null;
        const mockedComponent = new RoutesPage(mockFormbuilder, mockFactory);
        mockedComponent.form = component.form;
        const parsedDate = new Date();
        const actualTime = component.form.value['time'].split(':');
        parsedDate.setHours(actualTime[0]);
        parsedDate.setMinutes(actualTime[1]);
        await mockedComponent.getRoutes();
        expect(mockFactory.generateDefaultRoutes).toHaveBeenCalled();
        expect(mockFactory.generateDefaultRoutes).toHaveBeenCalledWith(
            mockedComponent.form.value['from'],
            mockedComponent.form.value['to'],
            null,
            parsedDate,
            mockedComponent.transportMode
        );
    });

    it('should call getRoutes() on submit()', () => {
        const mockedComponent = new RoutesPage(mockFormbuilder, mockFactory);
        spyOn(mockedComponent, 'getRoutes');
        mockedComponent.submit();
        expect(mockedComponent.getRoutes).toHaveBeenCalled();
    });
});
