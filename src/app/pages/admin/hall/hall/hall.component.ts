import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

interface Hall {
  name: string,
  price: string,
  chairs: string,
  tables: string
}


@Component({
  selector: 'app-hall',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule],
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.css'
})
export class HallComponent implements OnInit {
  [x: string]: any;
  form!: FormGroup;
  public url: any;
  loading = false;
  submitted = false;
  public hall: Hall = {
    name: '',
    price: '',
    chairs: '',
    tables: ''
  };

  constructor(private modalReference: ModalReference<Hall>,
    private formBuilder: FormBuilder,) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.hall = copy;
    }
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      chairs: ['', Validators.required],
      tables: ['', Validators.required]

    });

    this.form.setValue({
      name: this.hall.name,
      price: this.hall.price,
      chairs: this.hall.chairs,
      tables: this.hall.tables,

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
    console.log(this.hall)
  }
}
