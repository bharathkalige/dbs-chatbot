import { Component, OnInit } from '@angular/core';
import { MessageData } from '../pojo-classes/MessageData';
import { BotChatService } from '../services/chatbotService/bot-chat.service';
import { ResponseData } from '../pojo-classes/ResponseData';
import { BotResponse } from '../request-pojo-classes/botResponse';

@Component({
  selector: 'app-bot-chat',
  templateUrl: './bot-chat.component.html',
  styleUrls: ['./bot-chat.component.css']
})
export class BotChatComponent implements OnInit {

  public messages:MessageData[];
  public formValue:String;
  public botResponse:BotResponse;


  constructor(private _chatBotService:BotChatService) { }

  ngOnInit() {

    this._chatBotService.getMesagesList().subscribe(data=>this.messages=data);

  }
  sendMessage() {

    console.log("request: "+this.formValue);
    let chatMessage:MessageData = new MessageData("user",this.formValue);
    this._chatBotService.addNewMesaage(chatMessage).subscribe(function(data){

      this.botResponse=data;
      this._chatBotService.getMesagesList().subscribe(data=>this.messages=data);
    }.bind(this));
   
  }

}
