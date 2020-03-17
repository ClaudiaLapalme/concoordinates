import { Injectable } from '@angular/core';
import { OutdoorRoute } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  sharedRoute: OutdoorRoute;

  constructor() { }
}
