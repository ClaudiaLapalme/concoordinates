import { Injectable } from '@angular/core';
import { Route } from '../core/models';

@Injectable({
  providedIn: 'root'
})

/*
This service provides a way to pass objects between pages without having to serialize/deserialize them.
*/
export class StateService {
  sharedRoute: Route;

  constructor() { }
}
