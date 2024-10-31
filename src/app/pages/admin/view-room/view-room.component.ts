import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgxPaginationModule} from 'ngx-pagination';
import {ModalModule,ModalService} from '@developer-partners/ngx-modal-dialog'
import { RoomComponent } from '../room/room.component';

interface Room{
  name:string,
  roomNo:string,
  description:string,
  size:string,
  beds:string
}

@Component({
  selector: 'app-view-room',
  standalone: true,
  imports: [SideNavComponent,NgxDatatableModule,NgxPaginationModule,ModalModule],
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.css'
})
export class ViewRoomComponent {
  constructor(private modalService: ModalService){

  }

  addRoom(){
    this.modalService.show<Room>(RoomComponent,{
      title:"Create Room"
    
    });
  }

  editRoom(room:Room){
    this.modalService.show<Room>(RoomComponent,{
      title:"Update Room",
      model:room
    });
  }
  rows:Room[]=[
    {name:"abc",roomNo:"123",description:"hjsadgfjgshf",size:"137 sqft",beds:"2 single(s)"},
    {name:"def",roomNo:"345",description:"aaaaaaaa",size:"557 sqft",beds:"2 single(s)"},
    {name:"dgdh",roomNo:"876",description:"gfhjhj",size:"800 sqft",beds:"4 single(s)"},
    {name:"abrtyc",roomNo:"456",description:"yyyyyyy",size:"1200 sqft",beds:"2 double(s)"}
  ];
  currentPage = 1;
pageSize = 10;
}
