import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  private apiKey = new BehaviorSubject<string | null>(
    this.getApiKeyFromLocalStorage()
  );

  constructor() {}

  private getApiKeyFromLocalStorage() {
    return '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';
  }

  getApiKey() {
    return this.apiKey.asObservable();
  }

  setApiKey(apiKey: string) {
    localStorage.setItem('apiKey', apiKey);
    this.apiKey.next(apiKey);
  }
}
