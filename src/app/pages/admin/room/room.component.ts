import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardService } from '../../../service/dashboard.service';
import { ToastrService,ToastNoAnimation } from 'ngx-toastr';

import { NgxLoadingModule } from "ngx-loading";

interface Room {
  id:number;
  roomName: string,
  roomNo: number,
  description: string,
  size: string,
  beds: number,
  price:number,
  img:string
}



@Component({
  selector: 'app-room',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule,
     MatFormFieldModule,NgxLoadingModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {
  form!: FormGroup;
  public url: any;
  public loading = false;
  public isUpdate=false;
  submitted = false;
  public room: Room = {
    id:0,
    roomName: '',
    roomNo: 0,
    description: '',
    size: '',
    beds: 0,
    price: 0,
    img:''
  };

  constructor(private modalReference: ModalReference<Room>,
    private formBuilder: FormBuilder,private dashbdService:DashboardService,private toastr: ToastrService) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.room = copy;
      this.url=copy.img;
      this.isUpdate=true;
      console.log(this.room.id)
    }
  }
  ngOnInit(): void {
    if(this.isUpdate){
      this.form = this.formBuilder.group({
        id:[''],
        roomName: ['', Validators.required],
        roomNo: ['', Validators.required],
        description: ['', Validators.required],
        size: ['', Validators.required],
        beds: ['', Validators.required],
        price: ['', Validators.required],
        img: ['', Validators.required]
      });
  
      this.form.setValue({
        id:this.room.id,
        roomName: this.room.roomName,
        roomNo: this.room.roomNo,
        description: this.room.description,
        size: this.room.size,
        beds: this.room.beds,
        price: this.room.price,
        img:this.room.img
      });
    }else{
      this.form = this.formBuilder.group({
        roomName: ['', Validators.required],
        roomNo: ['', Validators.required],
        description: ['', Validators.required],
        size: ['', Validators.required],
        beds: ['', Validators.required],
        price: ['', Validators.required],
        img: ['', Validators.required]
      });
  
      this.form.setValue({
        roomName: this.room.roomName,
        roomNo: this.room.roomNo,
        description: this.room.description,
        size: this.room.size,
        beds: this.room.beds,
        price: this.room.price,
        img:this.room.img
      });
    }
    
  }

  public addFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.form.patchValue({
          img:event.target.result
        });
        console.log(this.url)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.loading=true;
    this.submitted = true;

    if (this.form.invalid) {
      this.loading=false;
      return;
    }

    console.log(this.form.value)
    if(this.isUpdate){
      this.editRoom();
    }else{
      this.saveRoom();
    }
    

  }
  editRoom() {
    this.dashbdService.updateRooms(this.form.value).subscribe(response=>{
      console.log(response);
      if(response=="CREATED"){
        this.modalReference.cancel();
        this.toastr.success('Room Updated', 'Success!');
        this.loading=false;
        window.location.reload();
      }else{
        this.toastr.error('Failed to update Room','Error');
        this.loading=false;
      }
    },(error)=>{
      console.log(error.error);
        this.toastr.error('Please fill all the fields carefully','Error');
        this.loading=false;
    })
  }
  saveRoom() {
    this.dashbdService.saveRoom(this.form.value).subscribe(response=>{
      console.log(response);
      if(response=="CREATED"){
        this.modalReference.cancel();
        this.toastr.success('Room Added', 'Success!');
        this.loading=false;
        window.location.reload();
      }else{
        this.toastr.error('Failed to save Room','Error');
        this.loading=false;
      }
    },
    (error) => {
        console.log(error.error);
        this.toastr.error('Please fill all the fields carefully','Error');
        this.loading=false;
    });
  }


}
