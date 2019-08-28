import { Injectable } from '@angular/core';
import { MessageData } from '../../pojo-classes/MessageData';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { ResponseData } from '../../pojo-classes/ResponseData';
import { TouchSequence } from 'selenium-webdriver';
import { BotRequest } from 'src/app/request-pojo-classes/BotRequest';
import { BotResponse } from 'src/app/request-pojo-classes/botResponse';

@Injectable({
  providedIn: 'root'
})
export class BotChatService {

  private _urlChat="http://localhost:8080/chatbot/chat";
  private _urlSend="http://localhost:8080/chatbot";

  constructor(private _http: HttpClient) { }

  getMesagesList():Observable<MessageData[]>{
    return this._http.get<MessageData[]>(this._urlChat);
  }

  addNewMesaage(chatMessage:MessageData):Observable<BotResponse>{
    let botRequest:BotRequest = new BotRequest("909",chatMessage.content);
    return this._http.post<BotResponse>(this._urlSend,botRequest);
  }

}
