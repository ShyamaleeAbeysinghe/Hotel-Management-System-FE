import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AvailableRoomsComponent } from '../available-rooms/available-rooms.component';
import { AvailableHallComponent } from '../available-hall/available-hall.component';
import { MyBookingComponent } from '../my-booking/my-booking.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DashboardComponent, AvailableRoomsComponent, AvailableHallComponent,
    MyBookingComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit, OnInit {
  form!: FormGroup;
  isRoomSelected = false;
  isHallSelected = false;
  isNothingSelected=true;
  isSearchRoom=true;
  submitted = false;
  dateCriteria = {};
  constructor(
    private formBuilder: FormBuilder,
    private navbar: ElementRef) {

  }
  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true); //third parameter
    this.form = this.formBuilder.group({
      searchType: ['room', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  scroll = (event: any): void => {
    let navTag = this.navbar.nativeElement.querySelector(".navbar");
    if (window.scrollY > 50) {
      if (!navTag.classList.contains('sticky-top')) {
        navTag.classList.add('sticky-top');
        navTag.classList.add('shadow-sm');
      }
    } else {
      if (navTag.classList.contains('sticky-top')) {
        navTag.classList.remove('sticky-top');
        navTag.classList.remove('shadow-sm');
      }
    }
  };

  ngAfterViewInit(): void {

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
