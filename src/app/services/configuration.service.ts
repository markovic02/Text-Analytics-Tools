import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private token: string = '';
  constructor() {
  }

  setToken(token: string):void{
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }
}
