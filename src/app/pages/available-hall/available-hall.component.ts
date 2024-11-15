import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-available-hall',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-hall.component.html',
  styleUrl: './available-hall.component.css'
})
export class AvailableHallComponent implements OnInit{
  @Input() public dateCriteria:any;
  halls:any;
  public loading = false;
  constructor(private customerService: CustomerService,private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService){

  }
  ngOnInit(): void {
    console.log(this.dateCriteria)
    this.customerService.getAvailableHalls(this.dateCriteria.bookingDate).subscribe(response=>{
      if(response!=null){
        this.halls=response;
      }
  });
  }

  confirm(room: any) {
    this.confirmationDialogService.confirm('Please confirm..', "You can't cancel the booking within 7 days of the booking date. Do you like to proceed?")
      .then((confirmed) => {
        if(confirmed){
          this.bookNow(room);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));


  }

  bookNow(hall:any){
    let hallBoking={
      hallId:hall.id,
      customerId:window.localStorage.getItem("user"),
      bookedDate:this.dateCriteria.bookingDate
    }
    this.customerService.saveHallBooking(hallBoking).subscribe(response=>{
      if(response=="CREATED"){
        this.customerService.getAvailableHalls(this.dateCriteria.bookingDate).subscribe(response => {
          if (response != null) {
            this.halls = response;
          }
        });
        
        this.toastr.success('Hall Booked', 'Success!');
        this.loading=false;
      }else{
        this.toastr.error('Failed to save booking','Error');
        this.loading=false;
      }
    },(error)=>{
      console.log(error.error);
        this.toastr.error('Please fill all the fields carefully','Error');
        this.loading=false;
    })
  }

}
