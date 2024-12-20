import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faMoneyBill,
  faBed,
  faHotel,
  faBellConcierge,
  faUsers,
  faUmbrellaBeach
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-card',
  standalone: true,
  imports: [FontAwesomeModule],
//   template: `


// {{ title }}

// {{ value }}


// {{ change }} Since Last Month







// `,
templateUrl: './admin-card.component.html',
  styleUrl: './admin-card.component.css'
})
export class AdminCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() change: string = '';
  @Input() iconName: string = '';
  user = faUsers;


  // Map the icon names to FontAwesome icons
  iconMappings: { [key: string]: IconDefinition } = {
    activeBooking: faUmbrellaBeach,
    staff: faUsers,
    orders: faBellConcierge,
    allBooking: faBed,
  };


  get icon(): IconDefinition {
    return this.iconMappings[this.iconName] || faMoneyBill; // Default to a specific icon if the name is not recognized
  }
}
