import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Customer {
  name: string,
  age: string,
  address: string,
  contact: string,
  email: string
 
 
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatIconModule,MatFormFieldModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  [x: string]: any;
  form!: FormGroup;
  public url: any;
  loading = false;
  submitted = false;
  public customer: Customer = {
    name: '',
    age: '',
    address: '',
    contact: '',
    email:''
  };

  constructor(private modalReference: ModalReference<Customer>,
    private formBuilder: FormBuilder,) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.customer = copy;
    }
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required]

    });

    this.form.setValue({
      name: this.customer.name,
      age: this.customer.age,
      address: this.customer.address,
      contact: this.customer.contact,
      email: this.customer.email
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
    console.log(this.customer)
  }


}
