import { Component } from '@angular/core';
import {EntityExtractionService} from "../services/entity-extraction.service";
import {HistoryService} from "../services/history.service";
import {ConfigurationService} from "../services/configuration.service";

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent {

  confidence: number = 0.6;
  text: string = "";
  detectedLang: string = "";
  abstract: boolean = false;
  include: boolean = false;
  image: any;
  categories: boolean = false;
  annotations: any;
  response: any;
  constructor(private entityService: EntityExtractionService, private historyService: HistoryService, private configService: ConfigurationService) {
  }
  extractEntities() {
    const includeOptions = [];
    if (this.abstract) {
      includeOptions.push('abstract');
    }
    if (this.categories) {
      includeOptions.push('categories');
    }
    if (this.image) {
      includeOptions.push('image');
    }
    const includeParam = includeOptions.join(',');
    const params = {
      token: this.configService.getToken(),
      text: this.text,
      confidence: this.confidence,
      include: includeParam,
    };

    this.entityService.entityExtraction(params).subscribe((data) => {
      this.response = data;
      this.detectedLang = data.lang;
      this.confidence = data.confidence;
      this.annotations = data.annotations;
      this.image = data.annotations.image;
      this.include = data.include;
      this.categories = data.categories;

    });


  }
  onChangeImage(){
    return !this.image;
  }
  onChangeCategorise(){
    return !this.categories;
  }
  onChangeAbstract(){
    return !this.abstract;
  }
  onChangeInclude(){
    return !this.include;
  }
  onSubmit(){
    this.extractEntities();
  }
  getImageFromAnnotations(annotations: any[]): string[] {
    const imageUrls: string[] = [];
    for (const annotation of annotations) {
      if (annotation.image && annotation.image.full) {
        imageUrls.push(annotation.image.full);
      }
    }
    return imageUrls;
  }
}
