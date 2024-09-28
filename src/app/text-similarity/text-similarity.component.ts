import { Component } from '@angular/core';
import {TextSimilarityService} from "../services/text-similarity.service";
import {ConfigurationService} from "../services/configuration.service";

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent {

  lang: string ="";
  langConfidence: number = 0;
  similarity: number = 0;
  time: number = 0;
  text: string = '';
  text2: string ='';
  response: any;
  constructor(private textSimilarityService: TextSimilarityService, private configService:ConfigurationService) {
  }

  computeSimilarity(){
    const params = {
      token: this.configService.getToken(),
      text: this.text,
      text2: this.text2,
    };

    this.textSimilarityService.computeSimilarity(params).subscribe((data)=>{
      this.response = data;
      this.lang = data.lang;
      this.langConfidence = data.langConfidence;
      this.similarity = data.similarity;
      this.time = data.time;
      this.text = data.text;
      this.text2 = data.text2;
    });

  }

  onComputeSimilarity(){ this.computeSimilarity();}

}


