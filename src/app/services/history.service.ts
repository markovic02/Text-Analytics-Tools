import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  // mapLog = new Map();
  logs: string[]= [];
  constructor() { }

  logRequest(params: string) {
    let date = new Date();
    let formatedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // this.mapLog.set(formatedDate, params);
    this.logs.push(formatedDate + " GET " + params);
    console.log(this.logs);
  }
}
