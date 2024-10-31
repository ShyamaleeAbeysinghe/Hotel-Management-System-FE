import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-view-meal',
  standalone: true,
  imports: [SideNavComponent],
  templateUrl: './view-meal.component.html',
  styleUrl: './view-meal.component.css'
})
export class ViewMealComponent {

}
