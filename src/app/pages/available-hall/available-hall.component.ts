import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';

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
  constructor(private customerService: CustomerService){

  }
  ngOnInit(): void {
    console.log(this.dateCriteria)
    this.customerService.getAvailableHalls(this.dateCriteria.bookingDate).subscribe(response=>{
      if(response!=null){
        this.halls=response;
      }
  });
  }

}
