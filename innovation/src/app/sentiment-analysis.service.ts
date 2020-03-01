import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {
  
  constructor() { };
 
  urlSentimentAnalysis = "https://westeurope.api.cognitive.microsoft.com/text/analytics/v3.0-preview.1/sentiment?showStats=true";
  urlKeyPhrases = "https://westeurope.api.cognitive.microsoft.com/text/analytics/v3.0-preview.1/keyPhrases?showStats=true";


  public analyseMessage( message ) {
    return this.requestToAzure (message, this.urlSentimentAnalysis);
  }

  public keyPhrases( message ) {
    return this.requestToAzure (message, this.urlKeyPhrases);
  }

  public requestToAzure( message, url ){

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url , false); 
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.setRequestHeader("Ocp-Apim-Subscription-Key", "3386dc2f060b41c1ac2776430b6774fc" );
    let data = {
      documents: [{
        language:"en",
        id: "1",
        text: message
      }]
    };
    xmlHttp.send( JSON.stringify(data) );
    return xmlHttp.responseText;
  } 


}

