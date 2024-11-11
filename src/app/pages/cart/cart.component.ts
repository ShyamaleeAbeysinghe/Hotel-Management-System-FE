import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SideNavComponent } from '../admin/side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { error } from 'jquery';
import { FooterComponent } from '../footer/footer.component';

interface Food {
  id: number;
  name: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatTabsModule, HeaderComponent, CommonModule, ModalModule, MatPaginator,
    MatSort, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, 
    MatInputModule,FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  displayedColumns: string[] = ['name', 'price', 'qty', 'action'];
  dataSource: MatTableDataSource<any>;
  foods:Food[]=[];
  total:number=0;


  constructor(private modalService: ModalService, private customerService: CustomerService,
    private toastr: ToastrService, private confirmationDialogService: ConfirmationDialogService) {
    this.dataSource = new MatTableDataSource(this.foods);
  }
  ngOnInit() {
    // @ts-ignore
    this.foods = JSON.parse(localStorage.getItem("food"));
    if (this.foods == undefined) {
      this.foods = []
    }
    this.dataSource = new MatTableDataSource(this.foods);
    this.foods.forEach(item => {
      this.total+=item.price;
    })
  }

  confirm() {
    this.confirmationDialogService.confirm('Please confirm..', "This item will be added to your bill. You have pay at the checkout")
      .then((confirmed) => {
        if (confirmed) {
          this.placeOrder()
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
  }

  placeOrder(){
    let request={
      foods:this.foods,
      totalPrice:1250,
      customerId:localStorage.getItem("user")
    }
    this.customerService.placeOrder(request).subscribe(response=>{
      if(response=="CREATED"){
        this.foods=[];
        localStorage.setItem("food", JSON.stringify(this.foods))
        this.dataSource = new MatTableDataSource(this.foods);
        this.toastr.success("Order Placed Successfully. Will receive to your room shortly","Success")
      }else{
        this.toastr.error("Something went wrong","Error");
      }
    },(error)=>{
      this.toastr.error("Something went wrong","Error");
    })
  }

  deleteFood(index:number){
    let food=this.foods[index];
    this.total-=food.price;
    this.foods.splice(index,1);
    localStorage.setItem("food", JSON.stringify(this.foods))
    this.dataSource = new MatTableDataSource(this.foods);
  }
}
