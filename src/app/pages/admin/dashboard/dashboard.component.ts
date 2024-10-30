import { Component } from '@angular/core';
import {
  faPen,
  faPlus,
  faMoneyBill,
  faUsers,
  faClock,
  faBriefcase,
  } from '@fortawesome/free-solid-svg-icons';
import { AdminCardComponent } from '../admin-card/admin-card.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminCardComponent,SideNavComponent,FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  edit = faPen;
  create = faPlus;
  budget = faMoneyBill;
  project = faUsers;
  time = faClock;
  work = faBriefcase;
}
