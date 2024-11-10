import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit{
  bookings:any;
  constructor(private customerService:CustomerService){

  }

  ngOnInit(): void {
    this.customerService.getAllRoomBookings().subscribe(response=>{
      console.log(response)
      this.bookings=response;
    })
  }

}
