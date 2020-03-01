import { Component, OnInit } from '@angular/core';
import { SentimentAnalysisService } from "../app/sentiment-analysis.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor( private sentimentAnalysisService : SentimentAnalysisService ){}

  // otherUserImg = "https://www.elle.ro/wp-content/uploads/2019/03/Olivia-Steer.jpg";
  // otherUserImg = "https://playtech.ro/wp-content/uploads/2019/09/Greta-1170x658.jpg";
  // otherUserImg = "https://randomuser.me/api/portraits/women/14.jpg";
  otherUserImg = "../assets/womanAvatar.png";

  messages = [
    {  
      user : "bot",
      text : "hi :)",
      timestamp : 1582987381096,
      image : "../assets/iva_logo.png"
    }
  ];

  statistics = [];
  isDemo = false;
  statsPage = false;

  ngOnInit(){
    if( window.location.pathname == "/demo"){
      this.isDemo = true;
    }
    if( window.location.pathname == "/stats"){
      this.statsPage = true;
    }
    console.log(123123123, this.statsPage);
    setTimeout(() => { document.getElementById("last-msg").scrollIntoView() }, 10); 
  }

  
  public onMessageSend(){
    let msg = document.getElementById("text-message")["value"];
    document.getElementById("text-message")["value"] = "";
    if(msg == ""){
      return;
    }   
    let newMsg = { 
      user : "user2",
      text : msg,
      timestamp : new Date().getTime(),
      image : this.otherUserImg
    }
    this.messages.push( newMsg );

    setTimeout(() => { document.getElementById("last-msg").scrollIntoView() }, 10); 
    this.analysemessage( msg );
  };


  analysemessage( newMessage : string ){
    let response : any = this.sentimentAnalysisService.analyseMessage(newMessage);
    response = JSON.parse(response); 
    let sentiment = response.documents[0].sentiment
    let score = response.documents[0].documentScores[sentiment]
    
    let response2 : any = this.sentimentAnalysisService.keyPhrases(newMessage);
    response2 = JSON.parse(response2); 
    let keywords = response2.documents[0].keyPhrases.join(" ");

    let statLine = {
      sentiment: sentiment,
      score: score,
      keywords: keywords
    }
    this.statistics.push(statLine);

    this.startTypying();
    setTimeout(() => { this.writeAnswer(); }, 1500);
    
  }

  private startTypying(){
    setTimeout(() => { 
      this.isTypigAnswer["timestamp"] = new Date().getTime(); 
      this.messages.push( this.isTypigAnswer );
      setTimeout(() => { document.getElementById("last-msg").scrollIntoView(); }, 10);
    }, 300);
  }


  private writeAnswer(){
    let nextMsg : any = this.getNextAnswer();
    nextMsg.timestamp = new Date().getTime();
    if(this.messages[this.messages.length - 1].text == "..."){
      this.messages.pop();
    }
    this.messages.push( nextMsg );
    
    setTimeout(() => { document.getElementById("last-msg").scrollIntoView(); }, 10);
    if(nextMsg.hasTwoAnswers){
      setTimeout(() => { this.writeAnswer() }, 500);
    }
  }

  currentAnswerIndex = 0;

  private getNextAnswer() : any{
    this.currentAnswerIndex ++;
    return this.answers[this.currentAnswerIndex -1];
  }

  isTypigAnswer = {
    timestamp : 1582987381496,
    user : "bot",
    text : "...",
    image : "../assets/iva_logo.png"
  };

  answers = [
    {  
      user : "bot",
      text : "My name is Iva and I am your conversational assistant for today:)",
      image : "../assets/iva_logo.png",
      hasTwoAnswers : true
    },  {  
      user : "bot",
      text : "I won't keep you long, can we chat a bit about society? ( yes / maybe / no )",
      image : "../assets/iva_logo.png"
    },  
    {  
      user : "bot",
      text : "I have been reading a lot of things about vaccination, pros and cons, what do you think about it?",
      image : "../assets/iva_logo.png"
    },  
    { 
      user : "bot",
      text : "I am confused, we all want to be healthy..but I cannot seem to find the right answer",
      image : "../assets/iva_logo.png",
      hasTwoAnswers: true
    },  
    { 
      user : "bot",
      text : "What about being obligated to vaccinate your child, is that okey?",
      image : "../assets/iva_logo.png",
    },
      
    { 
      user : "bot",
      text : "Is there any other moment when you felt like this?",
      image : "../assets/iva_logo.png"
    },
    { 
      user : "bot",
      text : "I see, those could really be tough times. I also feel in control when I am healthy enough for my family to depend on me.",
      image : "../assets/iva_logo.png",
      hasTwoAnswers: true
    },
    { 
      user : "bot",
      text : "When do you feel in control?",
      image : "../assets/iva_logo.png"
    },
    { 
      user : "bot",
      text : "I understand. Thank for your time.",
      image : "../assets/iva_logo.png"
    } 
  ];

  
  messages2 : any[] = [
    {  
      user : "bot",
      text : "Hello, my name is Iva and I am your conversational assistant for today:)",
      timestamp : 1582987381096,
      image : "../assets/iva_logo.png",
      hasTwoAnswers : true
    },  {  
      user : "bot",
      text : "I won't keep you long, can we chat a bit about society? ( yes / maybe / no )",
      timestamp : 1582987381096,
      image : "../assets/iva_logo.png"
    },  
    { 
      user : "user2",
      text : "yes",
      timestamp : 1582987381496,
      image : this.otherUserImg
    },
    { 
      user : "bot",
      text : "What do you feel when you are obligated to vaccinate your child?",
      timestamp : 1582987381596,
      image : "../assets/iva_logo.png"
    },
    { 
      user : "user2",
      text : "God gave us life, not the government! It can't decide on my rights and the rights of my child. NO to obligatory vaccines!!!",
      timestamp : 1582987381496,
      image : this.otherUserImg
    },
    { 
      user : "bot",
      text : "Is there any other moment in your life when you felt that?",
      timestamp : 1582987381596,
      image : "../assets/iva_logo.png"
    },
    { 
      user : "user2",
      text : "When I depended on social support in order to feed my child",
      timestamp : 1582987381496,
      image : this.otherUserImg
    },
    { 
      user : "bot",
      text : "I see, those could really be tough times. I also feel in control when I am healthy enough for my family to depend on me.",
      timestamp : 1582987381596,
      image : "../assets/iva_logo.png"
    }

  ];

}
