import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showSpinner: EventEmitter<any> = new EventEmitter(true);
  constructor() { }
}
