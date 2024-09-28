import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {map} from "rxjs";
import {HistoryService} from "../services/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  logs: string[]=[];
  constructor(private historyService:HistoryService) {}

  ngOnInit(){
    this.logs = this.historyService.logs;
    console.log("Iz komponente: ", this.logs);
  }

}
