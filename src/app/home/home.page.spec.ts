import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MapService } from '../core/services/map.service';
import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core';
import { RouterTestingModule } from '@angular/router/testing';


describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async(() => {

        class MockMapService {
            loadMap(): Promise<google.maps.Map<Element>> {
                return new Promise(() => { });
            }
        }

        TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [IonicModule.forRoot(), RouterModule, CoreModule, RouterTestingModule.withRoutes([])],
            providers: [{ provide: MapService, useClass: MockMapService }]
        }).compileComponents();

        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
