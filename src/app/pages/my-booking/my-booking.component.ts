import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { FooterComponent } from '../footer/footer.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FooterComponent, MatTableModule,MatPaginator,
    MatSort, MatPaginatorModule,
    MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit {
  bookingRooms: any;
  bookingHalls: any;
  allBookings: any;
  isActiveFutureBookings = true;
  isActiveBookingHalls = false;
  isActiveAllBookings = false;

  displayedColumns: string[] = ['roomName', 'roomNo', 'checkIn', 'checkOut', 'price', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(private customerService: CustomerService, private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) {
    const booking: any[] | undefined = [];
    this.dataSource = new MatTableDataSource(booking);
  }

  ngOnInit(): void {
    this.customerService.getActiveRoomBookings(window.localStorage.getItem("user")).subscribe(response => {
      this.bookingRooms = response;
    })

    this.customerService.getAllHallBookings(window.localStorage.getItem("user")).subscribe(response => {
      this.bookingHalls = response;
    })

    this.getAllBookings();
  }
  getAllBookings() {
    this.customerService.getAllRoomBookings().subscribe(response => {
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

  activateFutureBookings() {
    this.isActiveFutureBookings = true;
    this.isActiveBookingHalls = false;
    this.isActiveAllBookings = false;
  }

  activatehallBookings() {
    this.isActiveFutureBookings = false;
    this.isActiveBookingHalls = true;
    this.isActiveAllBookings = false;
  }

  activateAllBookings() {
    this.isActiveFutureBookings = false;
    this.isActiveBookingHalls = false;
    this.isActiveAllBookings = true;
  }

  confirm(bookingId: number, type: any) {
    this.confirmationDialogService.confirm('Please confirm..', "Are you sure?")
      .then((confirmed) => {
        if (confirmed && type == "room") {
          this.cancelRoomBooking(bookingId);
        } else if (confirmed && type == "hall") {
          this.cancelHallBooking(bookingId);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));


  }

  cancelRoomBooking(bookingId: number) {
    this.customerService.cancelRoomBooking(bookingId).subscribe(response => {
      if (response == "NOT_ACCEPTABLE") {
        this.toastr.warning("You can't cancel this booking", "Warning")
      } else if (response == "ACCEPTED") {
        this.toastr.success("Cancelled Booking successfully", "Success")
        this.customerService.getActiveRoomBookings(window.localStorage.getItem("user")).subscribe(response => {
          this.bookingRooms = response;
        })
      } else {
        this.toastr.error("Something went wrong", "Error")
      }
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }

  cancelHallBooking(bookingId: number) {
    this.customerService.cancelHallBooking(bookingId).subscribe(response => {
      if (response == "NOT_ACCEPTABLE") {
        this.toastr.warning("You can't cancel this booking", "Warning")
      } else if (response == "ACCEPTED") {
        this.toastr.success("Cancelled Booking successfully", "Success")
        this.customerService.getAllHallBookings(window.localStorage.getItem("user")).subscribe(response => {
          this.bookingHalls = response;
        })
      } else {
        this.toastr.error("Something went wrong", "Error")
      }
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }

}
