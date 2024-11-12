import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { AuthServiceService } from '../../../service/auth-service.service';
import { DashboardService } from '../../../service/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [SideNavComponent, CommonModule],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent implements OnInit {
  isPendingOrder = true;
  isCompletedOrder = false;
  isAdmin=false;
  foodOrders: any;
  currentRole: string | undefined;
  constructor(private authService: AuthServiceService, private dashboardService: DashboardService,
    private toastr: ToastrService, private confirmationDialogService: ConfirmationDialogService) {

  }
  ngOnInit(): void {
    this.currentRole = this.authService.getRole();
    this.initOrders()
  }
  initOrders() {
    if (this.isPendingOrder) {
      if (this.currentRole == "Admin" || this.currentRole == "Receptionist") {
        this.isAdmin=true
        this.getPendingOrdersForAdmin();
      } else if (this.currentRole == "Chef") {
        this.isAdmin=false;
        this.getPendingOrdersForChef();
      } else if (this.currentRole == "Room Boy") {
        this.isAdmin=false;
        this.getPendingOrdersForRoomBoy();
      }
    }else{
      if (this.currentRole == "Admin" || this.currentRole == "Receptionist") {
        this.isAdmin=true
        this.getCompletedOrdersForRoomBoy();
      } else if (this.currentRole == "Chef") {
        this.isAdmin=false;
        this.getCompletedOrdersForChef();
      } else if (this.currentRole == "Room Boy") {
        this.isAdmin=false;
        this.getCompletedOrdersForRoomBoy()
      }
    }

  }
  pendingOrders() {
    this.isPendingOrder = true;
    this.isCompletedOrder = false;
    this.initOrders()
  }
  completedOrders() {
    this.isPendingOrder = false;
    this.isCompletedOrder = true;
    this.initOrders()
  }
  getPendingOrdersForAdmin() {
    this.dashboardService.getPendingOrdersForAdmin().subscribe(response => {
      this.foodOrders = response;
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }
  getPendingOrdersForChef() {
    this.dashboardService.getOrdersForChef().subscribe(response => {
      this.foodOrders = response;
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }
  getCompletedOrdersForChef() {
    this.dashboardService.getCompletedForChef().subscribe(response => {
      this.foodOrders = response;
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }
  getPendingOrdersForRoomBoy() {
    this.dashboardService.getOrdersForRoomBoy().subscribe(response => {
      this.foodOrders = response;
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }
  getCompletedOrdersForRoomBoy() {
    this.dashboardService.getCompletedForRoomBoy().subscribe(response => {
      this.foodOrders = response;
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }
  confirmProcess(order: any) {
    this.confirmationDialogService.confirm('Please confirm..', "You are going to accept order")
      .then((confirmed) => {
        if (confirmed) {
          this.processOrder(order);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
  }
  confirmComplete(order: any) {
    this.confirmationDialogService.confirm('Please confirm..', "You are going to accept order")
      .then((confirmed) => {
        if (confirmed) {
          this.processOrder(order);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
  }
  confirmDelivered(order: any) {
    this.confirmationDialogService.confirm('Please confirm..', "Are delevered ordered to guest?")
      .then((confirmed) => {
        if (confirmed) {
          this.processOrder(order);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
  }

  processOrder(order: any) {
    this.dashboardService.updateOrder(order).subscribe(response => {
      if (response == "ACCEPTED") {
        this.toastr.success("Order updated", "Success")
        this.initOrders();
      } else {
        this.toastr.error("Can't update order", "Error")
      }
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }

}
