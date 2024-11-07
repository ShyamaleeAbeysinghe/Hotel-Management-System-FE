import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog'
import { RoomComponent } from '../room/room.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field'; import { MatInputModule } from '@angular/material/input';
import { DashboardService } from '../../../service/dashboard.service';
import { ToastrService } from 'ngx-toastr';

interface Room {
  roomName: string,
  roomNo: string,
  description: string,
  size: string,
  beds: string,
  price: string
}

@Component({
  selector: 'app-view-room',
  standalone: true,
  imports: [SideNavComponent, ModalModule, MatPaginator, MatSort, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.css'
})
export class ViewRoomComponent implements OnInit {

  displayedColumns: string[] = ['name', 'roomNo', 'description', 'size', 'beds', 'price', 'edit', 'delete'];
  dataSource: MatTableDataSource<Room>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  constructor(private modalService: ModalService, private dashboardService: DashboardService,private toastr: ToastrService) {
    // const rooms = [
    //   { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" }
    // ];
    const rooms: any[] | undefined = [];
    this.dataSource = new MatTableDataSource(rooms);
  }
  ngOnInit() {
    this.loadRooms();
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRoom() {
    this.modalService.show<Room>(RoomComponent, {
      title: "Create Room"

    });
  }

  editRoom(room: Room) {
    this.modalService.show<Room>(RoomComponent, {
      title: "Update Room",
      model: room
    });
  }
  deleteRoom(id:any){
    if(window.confirm("Are you sure?")){
      this.dashboardService.deleteRooms(id).subscribe(response =>{
        if(response==true){
          window.location.reload();
          this.toastr.success("Successfully deleted","Success!");
        }
      },(error)=>{
        console.log(error.error);
          this.toastr.error('Please fill all the fields carefully','Error');
          
      })
    }
    
  }
  async loadRooms() {
    this.dashboardService.getAllRooms().subscribe(response => {
      console.log(response)
      if (response != null) {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    })
  }
}


