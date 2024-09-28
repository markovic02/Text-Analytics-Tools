import { Component } from '@angular/core';
import {ConfigurationService} from "../services/configuration.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  token: string;
   date: Date;
  constructor(private configService: ConfigurationService) {
    this.date = new Date();
    this.token = this.configService.getToken();
  }

  setToken():void{
    this.configService.setToken(this.token);
  }
  onSubmit(){
    this.setToken();
  }
}
