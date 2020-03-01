import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SentimentAnalysisService } from '../app/sentiment-analysis.service'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [ SentimentAnalysisService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
