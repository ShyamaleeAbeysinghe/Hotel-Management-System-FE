import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog'
import { RoomComponent } from '../room/room.component';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';import { MatInputModule } from '@angular/material/input';
import { StaffComponent } from '../staff/staff.component';
import { DashboardService } from '../../../service/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatTableExporterModule } from 'mat-table-exporter';

interface Staff {
  
  firstName: string,
  lastName: string,
  address: string,
  contact: string,
  nic: string,
  role:number
}

@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [SideNavComponent, ModalModule, MatPaginator, MatSort,MatTableModule,
    MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule,MatTableExporterModule,MatIconModule],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.css'
})
export class ViewStaffComponent implements OnInit{
  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'contact', 'nic','role', 'edit','delete'];
  dataSource: MatTableDataSource<Staff>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService,private dashboardService: DashboardService,private toastr: ToastrService) {
    // const staff = [
    //   { fname: "abc", lname: "cdf", address: "hjsadgfjgshf", contact: "137 sqft", nic: "2123555677" ,role:"wwwwww"},
      
      
    // ];
    const staff: any[] | undefined = [];
    this.dataSource = new MatTableDataSource(staff);
  }
  
  ngOnInit() {
    this.loadStaff();
  }
  
  async loadStaff() {
    this.dashboardService.getAllStaff().subscribe(response => {
      console.log(response)
      if (response != null) {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    })
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

  deleteStaff(id:any){
    if(window.confirm("Are you sure?")){
      this.dashboardService.deleteStaff(id).subscribe(response =>{
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

  editStaff(staff: Staff) {
    this.modalService.show<Staff>(StaffComponent, {
      title: "Update Staff",
      model: staff
    });
  }


}
