import { CoreModule } from '..';
import { OverlayViewRenderer } from './overlay-view-renderer.service';
import { TestBed } from '@angular/core/testing';

describe('Overlay View Renderer', () => {
    let service: OverlayViewRenderer;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule]
        });
        service = TestBed.get(OverlayViewRenderer);
    });

    // Service is created
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});