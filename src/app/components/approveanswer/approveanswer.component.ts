import { Component, OnInit } from '@angular/core';


import {Router} from "@angular/router";


import {Question} from "../../Entities/question";
import {UserQuestion} from "../../Entities/user-question";
import {QuestionServiceService} from "../../Service/question-service.service";
import {TagServiceService} from "../../Service/tag-service.service";

@Component({
  selector: 'app-approveanswer',
  templateUrl: './approveanswer.component.html',
  styleUrls: ['./approveanswer.component.scss']
})
export class ApproveanswerComponent implements OnInit {

  file:any;
  role:any;
  Q:Question;
  userquestions:UserQuestion[];
  tag:String;
  type:any
  source:String;
  constructor(private service:QuestionServiceService,private router: Router,private tagService:TagServiceService) { }




  ngOnInit(): void{
    this.source="C:\Users\\ASUS\\OneDrive\\Bureau\\stage\\demande.pdf";

    this.role="teacher"
    this.service.getTeachersQuestion().subscribe(data=>{
      this.userquestions=data;
      console.log(data[0]);

    })
  }

  askQuestion(){
    this.router.navigate(['/question/addquestion']);
  }

  searchByTag(){
    if(this.tag != ""){
      this.tagService.getQuestionByTag(this.tag).subscribe(questions=>{
        this.userquestions=questions;
      })}
    else{
      this.service.getTeachersQuestion().subscribe(data=>{
        this.userquestions=data;


      })
    }

  }

}
