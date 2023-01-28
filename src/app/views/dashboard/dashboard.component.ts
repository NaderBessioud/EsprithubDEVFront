import { Component, OnInit ,ViewChild} from '@angular/core';
import { UsersServicesService } from 'src/app/Service/users-services.service';
import { Chart } from 'chart.js';
import { OptionsService } from 'src/app/Service/options.service';

import { QuestionServiceService } from 'src/app/Service/question-service.service';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit   {
  userCount:any;
  userCountbyDay:any;
  Teachers:any;
  users:any;
  options:any;
  questions:any;
  chart: Chart;
  messageSuccess:boolean=true;
  userPerMonth : any[]=null;

  constructor(
    private userService:UsersServicesService,
    private optionService:OptionsService,
    private questionService : QuestionServiceService){}
  ngOnInit(): void {

    this.userService.countUser().subscribe
    (data => this.userCount=data)
    this.userService.countUserByDay().subscribe
    (data => this.userCountbyDay=data)
    this.userService.countUserRole().subscribe
    (data => this.users=data)
    this.userService.countTeacherRole().subscribe
    (data => this.Teachers=data)

    this.userService.getUserPerMonth().subscribe(
      data=> this.userPerMonth=data)
    this.optionService.CountOption().subscribe
    (data => this.options=data)
    this.questionService.countQuestions().subscribe
    (data => this.questions=data)
    /// bar chart
    setTimeout(()=>{
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'may', 'june','july','august','September' , 'October','November','December'],
          datasets: [
            {
              label: 'Total user per Month',
              data: [this.userPerMonth[0],this.userPerMonth[1],,this.userPerMonth[2]
                ,this.userPerMonth[3],this.userPerMonth[4],this.userPerMonth[5],
                this.userPerMonth[6],this.userPerMonth[7],
                this.userPerMonth[8],this.userPerMonth[9],this.userPerMonth[10],this.userPerMonth[11],this.userPerMonth[12]],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
      });}  , 3000);

  }


  // Pie
  public pieChartLabels:string[] = ["User","Teacher"];
  public legend:string = 'pie';
  public pieChartType:string = 'pie';
  // events
  public chartClicked(e:any):void {
  }
  public chartHovered(e:any):void {
  }
  //end pie





}
