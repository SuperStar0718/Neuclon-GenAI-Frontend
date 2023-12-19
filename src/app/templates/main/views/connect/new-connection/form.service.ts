import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) { }

  getFormData(formName: string): Observable<any> {
    return this.http.get<any>(`assets/formjson/${formName}.json`);
  }
}