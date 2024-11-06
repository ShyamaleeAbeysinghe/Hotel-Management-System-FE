import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog'
import { RoomComponent } from '../room/room.component';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';import { MatInputModule } from '@angular/material/input';
import { StaffComponent } from '../staff/staff.component';

interface Staff {
  fname: string,
  lname: string,
  address: string,
  contact: string,
  nic: string,
  role:string
}

@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [SideNavComponent, ModalModule, MatPaginator, MatSort,MatTableModule,
    MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.css'
})
export class ViewStaffComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['fname', 'lname', 'address', 'contact', 'nic','role', 'edit','delete'];
  dataSource: MatTableDataSource<Staff>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService) {
    const staff = [
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"}
      
    ];
    this.dataSource = new MatTableDataSource(staff);
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

  addStaff() {
    this.modalService.show<Staff>(StaffComponent, {
      title: "Create Staff"

    });
  }

  editStaff(staff: Staff) {
    this.modalService.show<Staff>(StaffComponent, {
      title: "Update Staff",
      model: staff
    });
  }


}
