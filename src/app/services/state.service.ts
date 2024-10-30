import { Injectable } from '@angular/core';

import { Group } from '../interfaces/group';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  group?: Group;

  constructor() {}
}
