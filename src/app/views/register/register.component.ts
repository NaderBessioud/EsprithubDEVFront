import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Entities/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {AuthService} from "src/app/Service/auth.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit{
  user:User;
  constructor(private register:AuthService ,private router : Router,
              private toastr: ToastrService) {
    this.user = new User();
  }
  ngOnInit() :void {
    console.log("cbn");
  }
  save(){
    this.register.SaveUser(this.user).subscribe();
    this.router.navigate(["/login"]);
    this.toastr.success("Please check your email to complete your registration cccccc");

  }

}
