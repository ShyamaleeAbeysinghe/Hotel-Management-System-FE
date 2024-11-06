import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AvailableRoomsComponent } from './pages/available-rooms/available-rooms.component';
import { AvailableHallComponent } from './pages/available-hall/available-hall.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { ViewRoomComponent } from './pages/admin/view-room/view-room.component';
import { ViewHallComponent } from './pages/admin/view-hall/view-hall.component';
import { ViewStaffComponent } from './pages/admin/view-staff/view-staff.component';
import { ViewMealComponent } from './pages/admin/view-meal/view-meal.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { ViewCustomerComponent } from './pages/admin/view-customer/view-customer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,DashboardComponent,AvailableRoomsComponent,AvailableHallComponent,
    MyBookingComponent,ViewRoomComponent,ViewHallComponent,ViewStaffComponent,ViewMealComponent,LoginComponent,ViewCustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hotel-Management-System-FE';
}
