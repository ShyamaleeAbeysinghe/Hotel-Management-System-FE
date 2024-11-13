import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { HallComponent } from '../hall/hall/hall.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field'; import { MatInputModule } from '@angular/material/input';
import { CustomerComponent } from '../customer/customer.component';
import { DashboardService } from '../../../service/dashboard.service';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatIconModule } from '@angular/material/icon';

interface Customer {
  name: string,
  age: string,
  address: string,
  contact: string,
  email: string
}

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [SideNavComponent, ModalModule, MatPaginator, MatSort, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,MatTableExporterModule,MatIconModule],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'age', 'address', 'contact', 'email', 'delete'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService, private dashboardService: DashboardService) {
    // const customer=[
    //   {name:"abc",age:"200",address:"eeeeee345",contact:"3454646",email:"wwwwwwww"},



    // ];
    const customer: any[] | undefined = [];
    this.dataSource = new MatTableDataSource(customer);


  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.loadCustomer();
  }
  loadCustomer() {
    this.dashboardService.getAllCustomers().subscribe(response => {
      console.log(response)
      if (response != null) {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }


  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCustomer(id: number) {
    this.dashboardService.deleteCustomers(id).subscribe(response => {
      if(response){
        this.loadCustomer()
      }
    })
  }

}
