import { TestBed } from '@angular/core/testing';

import { IndoorFunctionsService } from './indoor-functions.service';

describe('IndoorFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
    expect(service).toBeTruthy();
  });

  it('should find startLocation in the indoor coordinates', () => {
    const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
    const indoorStart = 'H811';
    const outdoorEnd = 'outdoor';
    expect(service.coordinatesMatchIndoorParams(indoorStart, outdoorEnd)).toBeTruthy();
  });

  it('should find endLocation in the indoor coordinates', () => {
    const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
    const outdoorStart = 'H811';
    const indoorEnd = 'outdoor';
    expect(service.coordinatesMatchIndoorParams(outdoorStart, indoorEnd)).toBeTruthy();
  });

  it('should not find outdoorLocations in the indoor coordinates', () => {
    const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
    const outdoorStart = 'notIndoors';
    const outdoorEnd = 'notIndoors2';
    expect(service.coordinatesMatchIndoorParams(outdoorStart, outdoorEnd)).toBeFalsy();
  });
});
