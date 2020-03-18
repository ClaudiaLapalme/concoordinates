import { Injectable } from '@angular/core';
import { OutdoorRoute } from '../core/models';

@Injectable({
  providedIn: 'root'
})

/*
This service provides a way to pass objects between pages without having to serialize/deserialize them.
*/
export class StateService {
  sharedRoute: OutdoorRoute;

  constructor() { }
}
