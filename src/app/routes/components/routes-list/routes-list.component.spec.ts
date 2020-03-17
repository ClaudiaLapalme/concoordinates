import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RoutesListComponent } from './routes-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Route } from 'src/app/core';

describe('RoutesListComponent', () => {
    let component: RoutesListComponent;
    let fixture: ComponentFixture<RoutesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoutesListComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([])
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(RoutesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set current travel mode on display call', () => {
        const spyRoute = jasmine.createSpyObj('routeA', ['setCurrentTravelMode']);
        const spyTransportMode = jasmine.createSpyObj('spyTransportMode', ['']);
        component.routeTransportMode = spyTransportMode;
        component.routes = [spyRoute];
        component.displayRoute(0);
        expect(spyRoute.setCurrentTravelMode).toHaveBeenCalledWith(spyTransportMode);
    });

    it('should navigate to rendered-routes on display', () => {
        const spyRouter = jasmine.createSpyObj('spyRouter', ['navigateByUrl']);
        const spyStateService = jasmine.createSpyObj('spyStateService', ['']);
        const routesList = new RoutesListComponent(spyRouter, spyStateService);
        const routeA = jasmine.createSpyObj('routeA', ['setCurrentTravelMode']);
        routesList.routes = [routeA];
        routesList.displayRoute(0);
        expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('rendered-routes');
    });
});
