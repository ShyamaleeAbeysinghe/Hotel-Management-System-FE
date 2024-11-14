import { Component, OnInit } from '@angular/core';
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
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from '../../../service/dashboard.service';
import { data } from 'jquery';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminCardComponent, SideNavComponent, FontAwesomeModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalBooking = 0;
  activeBooking = 0;
  activeOrders = 0;
  staffMembers = 0;
  pieChartDatasets: any;
  lineChartData: ChartConfiguration<'line'>['data'] | undefined;

  pendingOrders: number = 0;
  preparingOrders: number = 0;
  deliveringOrders: number = 0;

  constructor(private dashboardService: DashboardService) {

  }
  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(response => {
      if (response != null) {
        this.totalBooking = response.totalBookings;
        this.activeBooking = response.activeBookings;
        this.activeOrders = response.activeOrders;
        this.staffMembers = response.allStaff;
      }
    })
    this.dashboardService.getDashboardOrderData().subscribe(response => {
      if (response != null) {
        this.pendingOrders = response.pendingOrders;
        this.preparingOrders = response.preparingOrders;
        this.deliveringOrders = response.deliveringOrders;
        this.loadChartData();
      }
    })
    this.dashboardService.getDashboardHistory().subscribe(response => {
      console.log(response.months[0])
      this.lineChartData = {
        labels: [
          response.months[11],
          response.months[10],
          response.months[9],
          response.months[8],
          response.months[7],
          response.months[6],
          response.months[5],
          response.months[4],
          response.months[3],
          response.months[2],
          response.months[1],
          response.months[0]
        ],
        datasets: [
          {
            data: [response.roomBookings[11], response.roomBookings[10], response.roomBookings[9],
                    response.roomBookings[8], response.roomBookings[7], response.roomBookings[6],
                    response.roomBookings[5], response.roomBookings[4], response.roomBookings[3],
                    response.roomBookings[2], response.roomBookings[1], response.roomBookings[0],],
            label: 'Room Bookings By Month',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'rgba(245,225,0,0.3)'
          },
          {
            data: [response.hallBookings[11],response.hallBookings[10],response.hallBookings[9],
                    response.hallBookings[8],response.hallBookings[7],response.hallBookings[6],
                    response.hallBookings[5],response.hallBookings[4],response.hallBookings[3],
                    response.hallBookings[2],response.hallBookings[1],response.hallBookings[0],],
            label: ' Hall Bookings By Month',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)'
          }
        ]
      };
    })
  }

  loadChartData() {
    this.pieChartDatasets = [{
      data: [this.pendingOrders, this.preparingOrders, this.deliveringOrders]
    }];
  }
  title = 'ng2-charts-demo';
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Pending', 'Orders'], ['Preparing', 'Orders'], ['Delivering', 'Orders']];
  // public pieChartDatasets = [ {
  //   data: [ 10, this.preparingOrders, this.deliveringOrders ]
  // } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];



  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  edit = faPen;
  create = faPlus;
  budget = faMoneyBill;
  project = faUsers;
  time = faClock;
  work = faBriefcase;


}
