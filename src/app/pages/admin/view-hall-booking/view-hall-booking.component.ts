import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { DashboardService } from '../../../service/dashboard.service';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-hall-booking',
  standalone: true,
  imports: [MatTabsModule, SideNavComponent, CommonModule, SideNavComponent, ModalModule, MatPaginator,
    MatSort, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatTableExporterModule,MatIconModule],
  templateUrl: './view-hall-booking.component.html',
  styleUrl: './view-hall-booking.component.css'
})
export class ViewHallBookingComponent implements OnInit{
  displayedColumns: string[] = ['cname', 'contact', 'hallName',  'bookDate',  'price', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService, private dashboardService: DashboardService,
    private toastr: ToastrService, private confirmationDialogService: ConfirmationDialogService) {
    const booking: any[] | undefined = [];
    this.dataSource = new MatTableDataSource(booking);
  }
  ngOnInit(): void {
    this.dashboardService.getAllHallBookings().subscribe(response => {
      console.log(response)
      this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
