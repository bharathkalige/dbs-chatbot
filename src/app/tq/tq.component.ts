import { Component, OnInit } from '@angular/core';


import { QueriesService } from '../services/tq/queries.service';
import { Queries } from '../pojo-classes/Queries';
import { QuestionRequest } from '../request-pojo-classes/QuestionRequest';
import { LocalStorage1Service } from '../local-storage1.service';
import { PostResponse } from '../request-pojo-classes/PostResponse';
import { AnswerRequest } from '../request-pojo-classes/AnswerRequest';
import { Answer } from '../pojo-classes/Answer';
import { LikeAnswerRequest } from '../request-pojo-classes/LikeAnswerRequest';
@Component({
 selector: 'app-tq',
 templateUrl: './tq.component.html',
 styleUrls: ['./tq.component.css']
})
export class TqComponent implements OnInit {
 public questionList : Queries[];
 public var1;
 public x1:any;
 public y:string = "#";
 public y1:string = "";
 public postResponse:PostResponse ;

 constructor(private  _queryService:QueriesService,private _sessionStorageService: LocalStorage1Service) { }

 ngOnInit() {
   this._queryService.getQuestionList().subscribe(data=>this.questionList=data);
   console.log(this.questionList);
 }

 myFunction() {
 }
 
 onClick2(x1){
   this.y="#demo"+x1;
   this.y1="demo"+x1;
   console.log(this.y);
   console.log(this.y1);
   console.log(x1);
   this.x1=x1;
 }

 postQuestion(ques:any){
   console.log(ques.value);
   let uid:any =  this._sessionStorageService.getFromSession("user_id");
   console.log(uid);
   let question:QuestionRequest = new QuestionRequest(ques.value,"909",ques.value);
   this._queryService.addQuestion(question).subscribe(function(data){
   this.postResponse=data;
   console.log(this.postResponse.status);
   this._queryService.getQuestionList().subscribe(data=>this.questionList=data);
  }.bind(this));
 }

 addAnswer(ans:any,question_id:any){
  console.log(question_id);
  let uid:any =  this._sessionStorageService.getFromSession("user_id");
  console.log(uid);
  let answer:AnswerRequest = new AnswerRequest("909",question_id,ans.value,0,0);
  this._queryService.addAnswerToQuestion(answer).subscribe(function(data){
   this.postResponse=data;
   console.log(this.postResponse.status);
   this._queryService.getQuestionList().subscribe(data=>this.questionList=data);
  }.bind(this));
 }

 likeMethod(answer_id:any){
   console.log(answer_id);
   let answer:LikeAnswerRequest = new LikeAnswerRequest(answer_id);
   this._queryService.likeAnswer(answer).subscribe(function(data){
   this.postResponse=data;
   console.log(this.postResponse.status);
   this._queryService.getQuestionList().subscribe(data=>this.questionList=data);
  }.bind(this));

 }

dislikeMethod(answer_id:any){
  console.log(answer_id);
  let answer:LikeAnswerRequest = new LikeAnswerRequest(answer_id);
  this._queryService.dislikeAnswer(answer).subscribe(function(data){
  this.postResponse=data;
  console.log(this.postResponse.status);
  this._queryService.getQuestionList().subscribe(data=>this.questionList=data);
 }.bind(this));

}

}