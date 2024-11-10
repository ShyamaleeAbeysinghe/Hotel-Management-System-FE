import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-available-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-rooms.component.html',
  styleUrl: './available-rooms.component.css'
})
export class AvailableRoomsComponent implements OnInit{
  @Input() public dateCriteria:any;
  rooms:any;
  constructor(private customerService: CustomerService){

  }
  ngOnInit(): void {
    console.log(this.dateCriteria)
    this.customerService.getAvailableRooms(this.dateCriteria.start,this.dateCriteria.end).subscribe(response=>{
        if(response!=null){
          this.rooms=response;
        }
    });

    
  }

  

}
