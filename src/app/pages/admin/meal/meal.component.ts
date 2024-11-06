import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Meal {
  name: string,
  price: string,
  description: string,
 
}

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent implements OnInit{

  form!: FormGroup;
  public url: any;
  loading = false;
  submitted = false;
  public meals: Meal = {
    name: '',
    price: '',
    description: ''
  };

  constructor(private modalReference: ModalReference<Meal>,
    private formBuilder: FormBuilder,) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.meals = copy;

    }
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.form.setValue({
      name: this.meals.name,
      price: this.meals.price,
      description: this.meals.description
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
    console.log(this.meals)
  }

}
