import { Component, OnInit } from '@angular/core';
import {
  faHome,
  faChartBar,
  faComment,
  faBookmark,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule,Routes } from '@angular/router';
import { AuthServiceService } from '../../../service/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [FontAwesomeModule,RouterModule,CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit{
  home = faHome;
  chart = faChartBar;
  message = faComment;
  bookmark = faBookmark;
  user = faUser;
  canAccessDashboard=false;
  canAccessRoom=false;
  canAccessHall=false;
  canAccessMeals=false;
  canAccessStaff=false;
  canAccessCustomer=false;
  canAccessBooking=false;
  canAccessOrders=false;
  
  constructor(private authService:AuthServiceService){

  }
  ngOnInit(): void {
    let currentRole=this.authService.getRole();
    if(currentRole=="Admin"){
      this.canAccessDashboard=true;
      this.canAccessRoom=true;
      this.canAccessHall=true;
      this.canAccessMeals=true;
      this.canAccessStaff=true;
      this.canAccessCustomer=true;
      this.canAccessBooking=true;
      this.canAccessOrders=true;
    }else if(currentRole=="Receptionist"){
      this.canAccessRoom=true;
      this.canAccessBooking=true;
      this.canAccessOrders=true;
      this.canAccessCustomer=true;
    }else if(currentRole=="Chef"){
      this.canAccessMeals=true;
      this.canAccessOrders=true;
    }else if(currentRole=="Room Boy"){
      this.canAccessOrders=true;
    }
  }
  signOut(){
    this.authService.logout();
  }
}
