import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Room {
  name: string,
  roomNo: string,
  description: string,
  size: string,
  beds: string,
  price:string
}



@Component({
  selector: 'app-room',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {
  form!: FormGroup;
  public url: any;
  loading = false;
  submitted = false;
  public room: Room = {
    name: '',
    roomNo: '',
    description: '',
    size: '',
    beds: '',
    price: ''
  };
  constructor(private modalReference: ModalReference<Room>,
    private formBuilder: FormBuilder,) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.room = copy;

    }
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      roomNo: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
      beds: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.form.setValue({
      name: this.room.name,
      roomNo: this.room.roomNo,
      description: this.room.description,
      size: this.room.size,
      beds: this.room.beds,
      price: this.room.price
    });
  }

  public addFile(event: any) {
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(this.url)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;


  }

  saveRoom() {
    console.log(this.room)
  }

}
