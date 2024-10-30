import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AvailableRoomsComponent } from './pages/available-rooms/available-rooms.component';
import { AvailableHallComponent } from './pages/available-hall/available-hall.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,DashboardComponent,AvailableRoomsComponent,AvailableHallComponent,MyBookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hotel-Management-System-FE';
}
