import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntityExtractionComponent} from "./entity-extraction/entity-extraction.component";
import {AuthGuard} from "./auth.guard";
import {ConfigurationComponent} from "./configuration/configuration.component";
import {TextSimilarityComponent} from "./text-similarity/text-similarity.component";
import {LanguageDetectionComponent} from "./language-detection/language-detection.component";
import {SentimentAnalysisComponent} from "./sentiment-analysis/sentiment-analysis.component";
import {HistoryComponent} from "./history/history.component";

const routes: Routes = [
  {
    path: '',
    component: EntityExtractionComponent,
   canActivate: [AuthGuard],
  },
  {
    path:'configuration',
    component: ConfigurationComponent
  },
  {
    path:'similarity',
    component: TextSimilarityComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'lang',
    component: LanguageDetectionComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'analysis',
    component: SentimentAnalysisComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'history',
    component: HistoryComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
