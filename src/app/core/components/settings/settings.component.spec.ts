import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {

    let componentLight: SettingsComponent;
    let fixtureLight: ComponentFixture<SettingsComponent>;

    let componentDark: SettingsComponent;
    let fixtureDark: ComponentFixture<SettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SettingsComponent
            ],
            imports: [
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                RouterModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: Storage }
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ]
        }).compileComponents();


        fixtureLight = TestBed.createComponent(SettingsComponent);
        componentLight = fixtureLight.componentInstance;
        fixtureLight.detectChanges();

        async () => {
            await componentLight['storage'].set('color-mode', 'dark');
        }

        fixtureDark = TestBed.createComponent(SettingsComponent);
        componentDark = fixtureDark.componentInstance;
        fixtureDark.detectChanges();
    }));

    it('should be created light color', () => {
        expect(componentLight).toBeTruthy();
    });

    it('should be created dark color', () => {
        expect(componentDark).toBeTruthy();
        expect(componentDark.checked).toBeTruthy();
    });

    describe('changeColorMode()', () => {

        it('change the color theme from light to dark', async () => {
            let initialColorTheme: Promise<any>;
            let colorThemeAfterChange: Promise<any>;

            await componentLight['storage'].get('color-mode').then((colorTheme) => {
                initialColorTheme = colorTheme;
            })

            await componentLight.changeColorMode();

            await componentLight['storage'].get('color-mode').then(async (colorTheme) => {
                colorThemeAfterChange = colorTheme;
            })

            expect(colorThemeAfterChange !== initialColorTheme).toBeTruthy();
        });

        it('change the color theme from dark to light', async () => {
            let initialColorTheme: Promise<any>;
            let colorThemeAfterChange: Promise<any>;

            await componentDark['storage'].get('color-mode').then((colorTheme) => {
                initialColorTheme = colorTheme;
            })

            await componentDark.changeColorMode();

            await componentDark['storage'].get('color-mode').then(async (colorTheme) => {
                colorThemeAfterChange = colorTheme;
            })

            expect(colorThemeAfterChange !== initialColorTheme).toBeTruthy();
        });
    });

    describe('toggleAccessiblity()', () => {

        it('should open Accessibility', () => {
            const initialAccessibilityDisplay = componentLight.displayAccessibility;
            componentLight.toggleAccessiblity();
            const accessibilityDisplayAfterToggle = componentLight.displayAccessibility;

            expect(initialAccessibilityDisplay !== accessibilityDisplayAfterToggle).toBeTruthy();
            expect(initialAccessibilityDisplay).toBeFalsy();
        });
    });

    describe('goBackToMenu()', () => {

        it('should emit an event', () => {
            spyOn(componentLight.closeSettings, 'emit');

            componentLight.goBackToMenu();

            expect(componentLight.closeSettings.emit).toHaveBeenCalled();
        });
    });
});