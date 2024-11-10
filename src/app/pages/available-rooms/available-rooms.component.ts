import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';
import { Payhere, AccountCategory, Customer, CurrencyType, PayhereCheckout, CheckoutParams } from "@payhere-js-sdk/client"
import md5 from 'crypto-js/md5';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-available-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-rooms.component.html',
  styleUrl: './available-rooms.component.css'
})
export class AvailableRoomsComponent implements OnInit {
  @Input() public dateCriteria: any;
  rooms: any;
  md5Key: any;
  public loading = false;
  constructor(private customerService: CustomerService, private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) {

  }
  ngOnInit(): void {
    console.log(this.dateCriteria)
    this.customerService.getAvailableRooms(this.dateCriteria.start, this.dateCriteria.end).subscribe(response => {
      if (response != null) {
        this.rooms = response;
      }
    });
    let merchantId = "1228603";
    let amountFormated = parseFloat("150").toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
    let merchantSecret = 'MjU0NjIwNTQ5OTEwNTQ1NDQ1NDQwNDUwNjEzNjA0MjU5NzUzNTM4';
    let hashedSecret = md5(merchantSecret).toString().toUpperCase();
    Payhere.init(merchantId, AccountCategory.SANDBOX)
    this.md5Key = md5(merchantId + "12345" + amountFormated + CurrencyType.LKR + hashedSecret).toString().toUpperCase();
    console.log(this.md5Key)
  }

  confirm(room: any) {
    this.confirmationDialogService.confirm('Please confirm..', "You can't cancel the booking within 7 days of the booking date. Do you like to proceed?")
      .then((confirmed) => {
        if (confirmed) {
          this.bookNow(room);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));


  }

  bookNow(room: any) {
    let roomBoking = {
      roomId: room.id,
      customerId: window.localStorage.getItem("user"),
      checkIn: this.dateCriteria.start,
      checkOut: this.dateCriteria.end
    }
    this.customerService.saveRoomBooking(roomBoking).subscribe(response => {
      if (response == "CREATED") {
        this.customerService.getAvailableRooms(this.dateCriteria.start, this.dateCriteria.end).subscribe(response => {
          if (response != null) {
            this.rooms = response;
          }
        });

        this.toastr.success('Room Booked', 'Success!');
        this.loading = false;
      } else {
        this.toastr.error('Failed to save booking', 'Error');
        this.loading = false;
      }
    }, (error) => {
      console.log(error.error);
      this.toastr.error('Please fill all the fields carefully', 'Error');
      this.loading = false;
    })
  }

  checkout() {
    const customer = new Customer({
      first_name: "Demo",
      last_name: "User",
      phone: "+94771234567",
      email: "user@example.com",
      address: "No. 50, Highlevel Road",
      city: "Panadura",
      country: "Sri Lanka",
    })
    console.log(this.md5Key)

    const checkoutData = new CheckoutParams({
      returnUrl: 'http://localhost:4200/return',
      cancelUrl: 'http://localhost:4200/cancel',
      notifyUrl: 'http://localhost:4200/notify',
      order_id: '12345',
      itemTitle: 'Demo Item',
      currency: CurrencyType.LKR,
      amount: 1000,
      platform: "",
      custom1: "",
      custom2: "",
      hash: this.md5Key
    })

    const checkout = new PayhereCheckout(customer, checkoutData, this.onPayhereCheckoutError)
    checkout.start()
  }

  onPayhereCheckoutError(errorMsg: any) {
    alert(errorMsg)
  }

}


