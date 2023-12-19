import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  component = new BehaviorSubject<string>('Home');
  widgetLock = new BehaviorSubject<boolean>(false);
  
  private headerVariable = new BehaviorSubject<any>(null);

  constructor() {}
}
