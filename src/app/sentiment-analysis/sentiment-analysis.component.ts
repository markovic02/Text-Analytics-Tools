import { Component } from '@angular/core';
import {HistoryService} from "../services/history.service";
import {SentimentAnalysisService} from "../services/sentiment-analysis.service";
import {ConfigurationService} from "../services/configuration.service";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent {
  text:string='';
  // lang:string='';
  sentiment:any;
  response:any;
  lang: string = 'en';
  langOptions: string[]= ['en','it','auto'];
  constructor(private sentiService: SentimentAnalysisService, private historySrvice:HistoryService, private configService:ConfigurationService) { }
  analyse(){
    if(this.lang='auto')
      this.lang = '';

    const params = {
      token: this.configService.getToken(),
      text: this.text,
      lang: this.lang
    };
    this.sentiService.analyse(params).subscribe((data) => {
      this.response = data;
      this.lang = data.lang;
      this.sentiment = data.sentiment;
    });
  }
  onAnalyse(){ this.analyse();}

  lerpRGB(min: number, max: number, value: number): string {
    const t = (value - min) / (max - min);
    const startColor = { r: 255, g: 0, b: 0 };
    const endColor = { r: 0, g: 255, b: 0 };

    const lerpedColor = this.lerpColor(startColor, endColor, t);
    return `rgb(${lerpedColor.r}, ${lerpedColor.g}, ${lerpedColor.b})`;
  }

  lerpColor(startColor:any, endColor:any, t:any) {
    return {
      r: Math.round(startColor.r + (endColor.r - startColor.r) * t),
      g: Math.round(startColor.g + (endColor.g - startColor.g) * t),
      b: Math.round(startColor.b + (endColor.b - startColor.b) * t)
    };
  }


}
