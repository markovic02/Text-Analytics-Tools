import { Component } from '@angular/core';
import {LanguageDetectionService} from "../services/language-detection.service";
import {ConfigurationService} from "../services/configuration.service";

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent {

  text: string='';
  response: any;
  detectedLangs:any;
  detectedLang: string = '';
  constructor(private langService: LanguageDetectionService, private configService:ConfigurationService) {}

  detectLanguage(){
    const params={token:this.configService.getToken(),text:this.text};

    this.langService.detectLanguage(params).subscribe((data) => {
      this.response = data;
      this.detectedLangs = data.detectedLangs;
      // this.detectedLang = data.detectedLang;
    })
  }

  onDetectLang(){
    this.detectLanguage();
  }

}
