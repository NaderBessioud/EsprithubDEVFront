import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { User } from 'src/app/Entities/user';
import { Option } from 'src/app/Entities/options';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsersServicesService } from 'src/app/Service/users-services.service';
import { OptionsService } from 'src/app/Service/options.service';
import { AuthService } from 'src/app/Service/auth.service';
import { map, tap } from 'rxjs/operators';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {QuestionServiceService} from "../../Service/question-service.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user:User
  options:Option[];
  oldpassword:string ;
  newPassword :string;
  selectedFile:File=null;
  src:any;
  dbImage:any;
  uploadedImage: File;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  constructor(private router : Router,
              private userservice:UsersServicesService,
              private optionsService:OptionsService,
              private http:HttpClient,
              private authservice:AuthService,
              private toastr: ToastrService,
              private service:QuestionServiceService) { }

  ngOnInit(): void {
    this.userservice.getinformations().subscribe(
      (data:User) =>{ this.user=data
    this.downloadImage(this.user.image);})
    this.optionsService.getOptions().subscribe(
      (data:Option[]) => this.options=data)

  }

  updateprofil(){
    this.user.image=sessionStorage.getItem("image")
    sessionStorage.removeItem("image");
    this.userservice.update(this.user,this.user.id).subscribe()
    this.toastr.success("profil updated");

  }
  onfilselected(event){
    this.selectedFile=<File>event.target.files[0];
  }

  changePhoto(){
    const fd=new FormData();
    //fd.append('File',this.selectedFile)
    // this.http.post('http://localhost:8080/EspritHub/user/insertImage/'+this.user.id,fd).subscribe()


    let reader = new FileReader();
    // when the load event is fired and the file not empty

    const imageFormData = new FormData();
    imageFormData.append('imageFile', this.selectedFile, this.selectedFile.name);
    console.log( this.selectedFile.name);
    this.service.UploadImage(imageFormData).subscribe(data=>{
      console.log(data);
      sessionStorage.setItem("image",data);
      this.toastr.success("photo changed Successfully");
      // this.downloadImage(data);
    })
    this.userservice.updateImage(this.user,sessionStorage.getItem("image")).subscribe();
    this.service.DownloadImage(sessionStorage.getItem("image")).subscribe(data=>{
      this.src=data
      console.log(this.src)
    })
  }

  getoption(e){
    this.user.option=e.target.value
  }
  changepassword(){
    const payload = new HttpParams()
      .set('oldpassword', this.oldpassword)
      .set('newPassword', this.newPassword);
    this.http.put<any>("http://localhost:8082/EspritHub/user/changePassowrd/"+this.user.id,payload).pipe(
      map(data =>
        {
          if (data.response=="wrong password"){
            this.toastr.error("wrong old password");
          }
          else {
            this.authservice.logout()
            this.router.navigate(["/login"])
            this.toastr.success("password changed Successfully");

          }
        }

      )
    ).subscribe()


  }

  downloadImage(name){

    this.service.DownloadImage(name).subscribe(res=> {


      if (res == null) {

        this.dbImage = res;
      } else {

        this.dbImage = res;

      }
    })
  }


  onimageChanged(event){
    let reader = new FileReader();
    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.uploadedImage = event.target.files[0];
    }

    console.log(this.uploadedImage);
    const imageFormData = new FormData();
    imageFormData.append('imageFile', this.uploadedImage, this.uploadedImage.name);
    console.log( this.uploadedImage.name);
    this.service.UploadImage(imageFormData).subscribe(data=>{
      console.log(data);
  sessionStorage.setItem('image',data)
      this.downloadImage(data);
    })

  }


}
