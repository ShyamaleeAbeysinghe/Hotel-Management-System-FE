import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit{
  bookingRooms:any;
  bookingHalls:any;
  constructor(private customerService:CustomerService,private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService  ){

  }

  ngOnInit(): void {
    this.customerService.getAllRoomBookings().subscribe(response=>{
      this.bookingRooms=response;
    })
    
    this.customerService.getAllHallBookings().subscribe(response=>{
      this.bookingHalls=response;
    })
  }

  confirm(bookingId:number,type:any) {
    this.confirmationDialogService.confirm('Please confirm..', "Are you sure?")
      .then((confirmed) => {
        if (confirmed && type=="room") {
          this.cancelRoomBooking(bookingId);
        }else if (confirmed && type=="hall") {
          this.cancelHallBooking(bookingId);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));


  }

  cancelRoomBooking(bookingId:number){
    this.customerService.cancelRoomBooking(bookingId).subscribe(response=>{
      if(response=="NOT_ACCEPTABLE"){
        this.toastr.warning("You can't cancel this booking","Warning")
      }else if(response=="ACCEPTED"){
        this.toastr.success("Cancelled Booking successfully","Success")
        this.customerService.getAllRoomBookings().subscribe(response=>{
          this.bookingRooms=response;
        })
      }else{
        this.toastr.error("Something went wrong","Error")
      }
    },(error)=>{
      this.toastr.error("Something went wrong","Error")
    })
  }

  cancelHallBooking(bookingId:number){
    this.customerService.cancelHallBooking(bookingId).subscribe(response=>{
      if(response=="NOT_ACCEPTABLE"){
        this.toastr.warning("You can't cancel this booking","Warning")
      }else if(response=="ACCEPTED"){
        this.toastr.success("Cancelled Booking successfully","Success")
        this.customerService.getAllHallBookings().subscribe(response=>{
          this.bookingHalls=response;
        })
      }else{
        this.toastr.error("Something went wrong","Error")
      }
    },(error)=>{
      this.toastr.error("Something went wrong","Error")
    })
  }

}
