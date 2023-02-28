import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Entities/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {
  url : string = 'http://192.168.2.176:8082/EspritHub/user';
  fd:FormData;
  constructor(private http: HttpClient) { }
  getUsers()
  {
    return this.http.get<User[]>(this.url+"/list");
  }
  deleteUser(id:number){


    return this.http.delete(this.url+"/managment/delete/"+id);
  }
  findbyId(id:number){

    return this.http.get<User>(this.url+"/managment/findById/"+id);

  }

  changeRole(user:User,id:number){
    return this.http.put(this.url+"/managment/changeRole/"+id,user);

  }
  update(user:User,id:number){
    console.log((user.option))
    return this.http.put(this.url+"/update/"+id,user);

  }
  updateImage(user:User,file){
    return this.http.post(this.url+"/insertImage",user,{params:{File:file}});

  }
  getinformations():Observable<User>{
    return this.http.get<User>(this.url+"/findByToken");

    }

  getrole(id:number){
    return this.http.get(this.url+"/managment/getrole/"+id);

  }
  test(){
    return this.http.get("http://localhost:8082/test/test",{responseType: 'text'});
  }

  countUser(){
    return this.http.get(this.url+"/countUser");
  }
  //count todays users
  countUserByDay(){
    return this.http.get(this.url+"/usersDay");
  }
  //count user with ROle User
  countUserRole(){
    return this.http.get(this.url+"/getRoleUser");
  }

  //count user with ROle Teacher
  countTeacherRole(){
    return this.http.get(this.url+"/getRoleTeacher");
  }
  //count user with ROle Teacher
  getUserPerMonth(){
    return this.http.get<number[]>(this.url+"/getUserPerMonth");
  }


}
