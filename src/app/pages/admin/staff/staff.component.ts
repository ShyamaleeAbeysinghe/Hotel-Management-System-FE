import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Staff {
  fname: string,
  lname: string,
  address: string,
  contact: string,
  nic: string,
  role:string

}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit{
  form!: FormGroup;
  public url: any;
  loading = false;
  submitted = false;
  public staff: Staff = {
    fname: '',
    lname: '',
    address: '',
    contact: '',
    nic: '',
    role:''
  };

  constructor(private modalReference: ModalReference<Staff>,
    private formBuilder: FormBuilder,) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.staff = copy;

    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      nic: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.form.setValue({
      fname: this.staff.fname,
      lname: this.staff.lname,
      address: this.staff.address,
      contact: this.staff.contact,
      nic: this.staff.nic,
      role: this.staff.role
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
    console.log(this.staff)
  }

}
