import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { HallComponent } from '../hall/hall/hall.component';

interface Hall {
  name: string,
  hallNo: string,
  price: string,
  chairs: string,
  tables: string
}

@Component({
  selector: 'app-view-hall',
  standalone: true,
  imports: [SideNavComponent,NgxDatatableModule,NgxPaginationModule,ModalModule],
  templateUrl: './view-hall.component.html',
  styleUrl: './view-hall.component.css'
})
export class ViewHallComponent {
  constructor(private modalService: ModalService){

  }

  addHall(){
    this.modalService.show<Hall>(HallComponent,{
      title:"Create Hall"
    
    });
  }

  editHall(hall:Hall){
    this.modalService.show<Hall>(HallComponent,{
      title:"Update Hall",
      model:hall
    });
  }
  rows:Hall[]=[
    {name:"abc",hallNo:"123",price:"200",chairs:"4",tables:"3"},
    {name:"abc",hallNo:"123",price:"20120",chairs:"4100",tables:"50"},
    {name:"abc",hallNo:"123",price:"300000",chairs:"100",tables:"30"},
    {name:"abc",hallNo:"123",price:"2012220",chairs:"500",tables:"100"}
    
  ];
  currentPage = 1;
pageSize = 10;
}
