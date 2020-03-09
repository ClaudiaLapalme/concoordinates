import { Injectable } from '@angular/core';
import { Route } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  sharedRoute: Route;

  constructor() { }
}
