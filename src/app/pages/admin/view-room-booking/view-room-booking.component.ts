import { Component, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../../service/dashboard.service';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { error } from 'jquery';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-view-room-booking',
  standalone: true,
  imports: [MatTabsModule, SideNavComponent, CommonModule, SideNavComponent, ModalModule, MatPaginator,
    MatSort, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatTableExporterModule,MatIconModule],
  templateUrl: './view-room-booking.component.html',
  styleUrl: './view-room-booking.component.css'
})
export class ViewRoomBookingComponent {
  isActiveBookings = true;
  isCheckedIn = false;
  isCancelledBooking = false;
  isAllBooking = false;
  bookings: any;

  displayedColumns: string[] = ['cname', 'contact', 'roomName', 'roomNo', 'checkIn', 'checkOut', 'price', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService, private dashboardService: DashboardService,
    private toastr: ToastrService, private confirmationDialogService: ConfirmationDialogService) {
    const booking: any[] | undefined = [];
    this.dataSource = new MatTableDataSource(booking);
  }
  ngOnInit() {
    this.dashboardService.getAllRoomBookings().subscribe(response => {
      this.bookings = response;
      this.getActiveBookings();
    })
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getActiveBookings() {
    this.isActiveBookings = true;
    this.isCheckedIn = false;
    this.isCancelledBooking = false;
    this.isAllBooking = false;
    var activeBookings: any = [];
    for (let i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i].status == "Pending") {
        activeBookings.push(this.bookings[i])
      }
    }
    this.dataSource = new MatTableDataSource(activeBookings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCheckedIn() {
    this.isActiveBookings = false;
    this.isCheckedIn = true;
    this.isCancelledBooking = false;
    this.isAllBooking = false;
    var checkedInBookings: any = [];
    for (let i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i].status == "CheckIn") {
        checkedInBookings.push(this.bookings[i])
      }
    }
    this.dataSource = new MatTableDataSource(checkedInBookings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllBookings() {
    this.isActiveBookings = false;
    this.isCheckedIn = false;
    this.isCancelledBooking = false;
    this.isAllBooking = true;
    this.dataSource = new MatTableDataSource(this.bookings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCancelledBookings() {
    this.isActiveBookings = false;
    this.isCheckedIn = false;
    this.isCancelledBooking = true;
    this.isAllBooking = false;
    var cancelledBookings: any = [];
    for (let i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i].status == "Cancelled") {
        cancelledBookings.push(this.bookings[i])
      }
    }
    this.dataSource = new MatTableDataSource(cancelledBookings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  confirmCheckIn(bookingId: number) {
    this.confirmationDialogService.confirm('Please confirm..', "Are you sure?")
      .then((confirmed) => {
        if (confirmed) {
          this.checkIn(bookingId);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));

  }
  confirmCheckOut(bookingId: number) {
    this.dashboardService.getRoomBookingTotal(bookingId).subscribe(response => {
      if (response != null) {
        this.confirmationDialogService.confirm('Please confirm..', "Customer have to pay total bill of LKR "+response+". You can proceed this after completion of the payment")
          .then((confirmed) => {
            if (confirmed) {
              this.checkOut(bookingId);
            }
          })
          .catch(() => console.log('User dismissed the dialog '));
      }
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })


  }

  checkIn(bookingId: number) {
    this.dashboardService.checkInRoomBooking(bookingId).subscribe(response => {
      if (response.status === "success") {
        this.toastr.success("Check In success", "Success")
        this.dashboardService.getAllRoomBookings().subscribe(response => {
          this.bookings = response;
          this.getActiveBookings();
        })
      } else if (response.status === "failed" && response.reason === "invalid date") {
        this.toastr.error("Check in date is incorrect. Customer can't check in today")
      } else {
        this.toastr.error("Something went wrong", "Error")
      }
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }
  checkOut(bookingId: number) {
    this.dashboardService.checkOutRoomBooking(bookingId).subscribe(response => {
      if (response === "ACCEPTED") {
        this.toastr.success("Check Out success", "Success")
        this.dashboardService.getAllRoomBookings().subscribe(response => {
          this.bookings = response;
          this.getCheckedIn();
        })
      }  else {
        this.toastr.error("Something went wrong", "Error")
      }
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }

}
