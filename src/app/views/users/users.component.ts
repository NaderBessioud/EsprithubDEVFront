import { Component, OnInit ,ViewChild} from '@angular/core';
import { User } from 'src/app/Entities/user';
import {UsersServicesService} from "src/app/Service/users-services.service";
import { Router } from '@angular/router';

import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listUser:User[];
  searchtext:any;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;


  constructor(private userService:UsersServicesService , private route:Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data:User[] )=>this.listUser=data
    )
  }
  delete(id:number){

    this.userService.deleteUser(id).subscribe();
  }
  detail(id:number){


    this.route.navigate(["theme/users/user/"+id])
  }



}
