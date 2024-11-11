import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AvailableRoomsComponent } from '../available-rooms/available-rooms.component';
import { AvailableHallComponent } from '../available-hall/available-hall.component';
import { MyBookingComponent } from '../my-booking/my-booking.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,DashboardComponent, AvailableRoomsComponent, AvailableHallComponent, 
    CommonModule, ReactiveFormsModule,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  form!: FormGroup;
  isRoomSelected = false;
  isHallSelected = false;
  isNothingSelected=true;
  isSearchRoom=true;
  submitted = false;
  todayDate:any;
  dateCriteria = {};
  constructor(
    private formBuilder: FormBuilder,
    private navbar: ElementRef) {

  }
  ngOnInit(): void {
    var datePipe = new DatePipe('en-US');
    this.todayDate=datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.form = this.formBuilder.group({
      searchType: ['room', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
    if (this.form.value.searchType == "room") {
      this.isRoomSelected = true;
      this.isHallSelected=false;
      this.isNothingSelected=false;
      this.dateCriteria = {
        start: this.form.value.startDate,
        end: this.form.value.endDate
      };
    }else{
      this.isHallSelected=true;
      this.isRoomSelected=false;
      this.isNothingSelected=false;
      this.dateCriteria = {
        bookingDate: this.form.value.bookingDate
      };
    }
  }

  changeSerachType(){
    if(this.f['searchType'].value=="room"){
        this.isSearchRoom=true;
        this.form = this.formBuilder.group({
          searchType: ['room', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required]
        });
    }else{
        this.isSearchRoom=false;
        this.form = this.formBuilder.group({
          searchType: ['hall', Validators.required],
          bookingDate: ['', Validators.required],
        });
    }
  }
}
