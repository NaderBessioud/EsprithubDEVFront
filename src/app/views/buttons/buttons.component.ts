import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {QuestionServiceService} from "../../Service/question-service.service";
import {Question} from "../../Entities/question";
import {UserQuestion} from "../../Entities/user-question";
import {Router} from "@angular/router";
import {TagServiceService} from "../../Service/tag-service.service";

import {User} from "../../Entities/user";
import {UsersServicesService} from "../../Service/users-services.service";
import {Ue} from "../../Entities/Ue";
import {UeServiceService} from "../../Service/ue-service.service";

@Component({
  templateUrl: 'buttons.component.html',
  styleUrls: ['buttons.component.css']

})
export class ButtonsComponent implements  OnInit{
  user:User;
  file:any;
  role:any;
  Q:Question;
  userquestions:UserQuestion[];
  tag:String;
  libelle:String
  type:any
  source:String;
  ues:Ue[];
  constructor(private service:QuestionServiceService,private router: Router,private tagService:TagServiceService,
              private renderer: Renderer2,private elementRef: ElementRef,
              private userService:UsersServicesService,
              private ueservice:UeServiceService) { }



openv(){

  this.service.downloadFile("certif3.pdf").subscribe(data=> {

    /*var binary_string =  atob(data);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
    }
    let blob: any = new Blob([bytes.buffer], { type: 'application/octet-stream' });
  console.log(data)

    let blobb = new Blob([data], {type: 'application/pdf'});
    let pdfUrl = window.URL.createObjectURL(blobb);
    var PDF_link = document.createElement('a');
    window.open(pdfUrl, '_blank');*/

  })
}
  ngOnInit(): void{

    this.ueservice.getAllUE().subscribe(modules => {
      this.ues = modules;
      console.log(modules)
    })

// Other Browsers


  this.userService.getinformations().subscribe(uss=>{
    this.user=uss;
    this.role=uss.role;
    console.log(uss)
  })


    this.service.getStudentQuestion().subscribe(data=>{
      this.userquestions=data;
      console.log(data[0]);

    })
  }

  askQuestion(){
    this.router.navigate(['/question/addquestion']);
  }

  searchByTag(){
    if(this.tag =="" && this.libelle=="Choose UE"){
      this.service.getAllUserQuestion().subscribe(data=>{
        this.userquestions=data;


      })
    }
    else{
    if(this.libelle != "Choose UE"){
    if(this.tag != ""){
    this.service.getQuestionByTagAndUE(this.tag,this.libelle).subscribe(questions=>{
      this.userquestions=questions;
    })}
    else{
      this.service.getQuestionByUE(this.libelle).subscribe(data=>{
        this.userquestions=data;


      })
    }
    }
    else{
      if(this.tag != ""){
        this.service.getQuestionByTag(this.tag).subscribe(questions=>{
          this.userquestions=questions;
        })}


    }

    }
  }

  searchBylibelle(){
    console.log(this.tag)
    console.log(this.libelle)
    console.log("hoouuunnnii")
    if(this.tag =="" && this.libelle=="Choose UE"){
      this.service.getAllUserQuestion().subscribe(data=>{
        this.userquestions=data;


      })
    }
    else{
      if(this.libelle != "Choose UE"){
        if(this.tag != "" && this.tag != undefined){
          this.service.getQuestionByTagAndUE(this.tag,this.libelle).subscribe(questions=>{
            this.userquestions=questions;
          })}
        else{
          this.service.getQuestionByUE(this.libelle).subscribe(data=>{
            this.userquestions=data;


          })
        }
      }
      else{
        if(this.tag != ""){
          this.service.getQuestionByTag(this.tag).subscribe(questions=>{
            this.userquestions=questions;
          })}


      }

    }
  }




}
