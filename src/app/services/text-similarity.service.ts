import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {TEXT_SIMILARITY_API} from "../api-contst";
import {HistoryService} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class TextSimilarityService {
  constructor(private httpClient: HttpClient, private historyService: HistoryService) { }

  computeSimilarity(params:{text:string, text2: string,token:string}):Observable<any>{
    const httpParams = new HttpParams()
      .set("text", params.text)
      .set("text2", params.text2)
      .set("token", params.token)
    const urlInfo :string = `${TEXT_SIMILARITY_API}?${httpParams.toString()}`;
    this.historyService.logRequest(urlInfo);
    return this.httpClient.get<any>(urlInfo).pipe(
      catchError(error => {
        return throwError(() => error.status + ':' + error.message);
      })
    );
  }
}
