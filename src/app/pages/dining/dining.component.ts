import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CustomerService } from '../../service/customer.service';
import { error } from 'jquery';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
interface Food {
  id: number;
  name: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-dining',
  standalone: true,
  imports: [HeaderComponent, CommonModule,FooterComponent],
  templateUrl: './dining.component.html',
  styleUrl: './dining.component.css'
})
export class DiningComponent implements OnInit {
  foods: any;
  isFoodsAvailable = false;
  isActiveFoods = true;
  isActiveOrders = false;
  foodCart: Food[] = [];

  constructor(private toastr: ToastrService, private confirmationDialogService: ConfirmationDialogService,
    private customerService: CustomerService) {

  }
  ngOnInit(): void {
    // @ts-ignore
    this.foodCart = JSON.parse(localStorage.getItem("food"));
    if (this.foodCart == undefined) {
      this.foodCart = []
    }
    this.customerService.isCustomerCheckedIn(window.localStorage.getItem("user")).subscribe(response => {
      if (response) {
        this.isFoodsAvailable = true;
      } else {
        this.isFoodsAvailable = false;
      }

    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
    this.customerService.getAllResturantMenu().subscribe(response => {
      this.foods = response;
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }

  getFoods() {
    this.isActiveFoods = true;
    this.isActiveOrders = false;

  }

  getMyOrders() {
    this.isActiveFoods = false;
    this.isActiveOrders = true;

  }

  addtoCart(food: any) {
    console.log(food);
    var itemFound = false;
    this.foodCart.forEach(item => {
      if (item.id == food.id) {
        itemFound = true;
        item.qty=item.qty+1;
      }
    })
    if(!itemFound){
      const foodItem: Food = { id: food.id, name: food.foodName, price: food.price, qty: 1 }
      this.foodCart.push(foodItem);
    }
    localStorage.setItem("food", JSON.stringify(this.foodCart))
    this.toastr.success("Item added to cart","Success")
  }

}
