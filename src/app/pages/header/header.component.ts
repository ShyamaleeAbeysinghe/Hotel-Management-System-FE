import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import {RouterModule} from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit, OnInit {
  customerName:string="";
  constructor(private navbar: ElementRef,private authService:AuthServiceService){

  }
  
  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true); 
    this.authService.getCustomerDetails(localStorage.getItem("user")).subscribe(response=>{
      this.customerName=response.customerName;
    },(error)=>{
      console.log("Error while getting customer data")
    })
  }

  scroll = (event: any): void => {
    let navTag = this.navbar.nativeElement.querySelector(".navbar");
    if (window.scrollY > 50) {
      if (!navTag.classList.contains('sticky-top')) {
        navTag.classList.add('sticky-top');
        navTag.classList.add('shadow-sm');
      }
    } else {
      if (navTag.classList.contains('sticky-top')) {
        navTag.classList.remove('sticky-top');
        navTag.classList.remove('shadow-sm');
      }
    }
  };

  ngAfterViewInit(): void {

  }

  logout(){
    this.authService.customerLogout();
  }
  

}
