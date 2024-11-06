import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog'
import { RoomComponent } from '../room/room.component';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';import { MatInputModule } from '@angular/material/input';

interface Room {
  name: string,
  roomNo: string,
  description: string,
  size: string,
  beds: string,
  price:string
}

@Component({
  selector: 'app-view-room',
  standalone: true,
  imports: [SideNavComponent, ModalModule, MatPaginator, MatSort,MatTableModule,
    MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule],
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.css'
})
export class ViewRoomComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['name', 'roomNo', 'description', 'size', 'beds','price', 'edit','delete'];
  dataSource: MatTableDataSource<Room>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(private modalService: ModalService) {
    const rooms = [
      { name: "abc", roomNo: "123", description: "hjsadgfjgshf", size: "137 sqft", beds: "2 single(s)",price:"1200" },
      { name: "def", roomNo: "345", description: "aaaaaaaa", size: "557 sqft", beds: "2 single(s)",price:"1200"},
      { name: "dgdh", roomNo: "876", description: "gfhjhj", size: "800 sqft", beds: "4 single(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" },
      { name: "abrtyc", roomNo: "456", description: "yyyyyyy", size: "1200 sqft", beds: "2 double(s)",price:"1200" }
    ];
    this.dataSource = new MatTableDataSource(rooms);
  }
  ngAfterViewInit(): void {
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;   
  }
  ngOnInit() {
  }

  applyFilter(event: any) {
    const filterValue=event.target.value;
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
}
