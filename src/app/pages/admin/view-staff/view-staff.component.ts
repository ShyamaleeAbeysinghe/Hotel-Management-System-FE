import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [SideNavComponent],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.css'
})
export class ViewStaffComponent {

}
