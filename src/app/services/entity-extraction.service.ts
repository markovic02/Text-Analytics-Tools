import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError,  Observable, throwError} from "rxjs";
import {ENTITY_EXTRACTION_API} from "../api-contst";
import {HistoryService} from "./history.service";
import {HistoryComponent} from "../history/history.component";

@Injectable({
  providedIn: 'root'
})
export class EntityExtractionService {
  constructor(private httpClient: HttpClient, private historyService:HistoryService) {}
  entityExtraction(params: {token: string,text: string,confidence: number, include: string}): Observable<any> {
    const httpParams = new HttpParams()
        .set("token", params.token)
        .set("text", params.text)
        .set("confidence", params.confidence)
        .set("include", params.include)

    const urlInfo = `${ENTITY_EXTRACTION_API}?${httpParams.toString()}`;
    this.historyService.logRequest(urlInfo);
    console.log("URL info: ", urlInfo);
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
