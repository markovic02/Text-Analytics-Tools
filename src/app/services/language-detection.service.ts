import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {LANGUAGE_DETECTION_API} from "../api-contst";
import {HistoryService} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageDetectionService {

  constructor(private httpClient: HttpClient,private historyService: HistoryService) { }

  detectLanguage(params:{text:string,token:string}):Observable<any>{
    const httpParams = new HttpParams()
      .set("token", params.token)
      .set("text", params.text );

    const urlInfo = `${LANGUAGE_DETECTION_API}?${httpParams.toString()}`;
    this.historyService.logRequest(urlInfo);
    const observable = this.httpClient.get<any>(urlInfo).pipe(
      catchError(error => {
        return throwError(() => error.status + ': ' + error.error.message);
      })
    );
    observable.subscribe(data => {
      console.log('Rezultat entityExtraction:', data);
    });
    return observable;
  }
}
