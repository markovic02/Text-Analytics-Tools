import { Injectable } from '@angular/core';
import {HistoryService} from "./history.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {LANGUAGE_DETECTION_API, SENTIMENT_ANALYSIS_API} from "../api-contst";

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {

  constructor(private httpClient: HttpClient, private historyService:HistoryService) {}


  analyse(params:{text:string,token:string, lang:string}):Observable<any>{
    const httpParams = new HttpParams()
      .set("token", params.token)
      .set("text", params.text )
      .set("lang", params.lang);

    const urlInfo = `${SENTIMENT_ANALYSIS_API}?${httpParams.toString()}`;

    this.historyService.logRequest(urlInfo);

    const observable = this.httpClient.get<any>(urlInfo).pipe(
      catchError(error => {
        return throwError(() => error.status + ': ' + error.error.message);
      })
    );
    observable.subscribe(data => {
      console.log('Rezultat sentiment analyse:', data);
    });
    return observable;
  }
}
