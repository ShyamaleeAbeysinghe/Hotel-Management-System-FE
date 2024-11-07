import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxLoadingModule } from 'ngx-loading';
import { DashboardService } from '../../../service/dashboard.service';
import { ToastrService } from 'ngx-toastr';

interface Meal {
  id:number,
  foodName: string,
  price: number,
  description: string,
  img:string
 
}

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule,NgxLoadingModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent implements OnInit{

  form!: FormGroup;
  public url: any;
  loading = false;
  submitted = false;
  public isUpdate=false;
  public meals: Meal = {
    id:0,
    foodName: '',
    price: 0,
    description: '',
    img:''
  };

  constructor(private modalReference: ModalReference<Meal>,
    private formBuilder: FormBuilder,private dashboardService:DashboardService,private toastr: ToastrService) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.meals = copy;
      this.url=copy.img
      this.isUpdate=true;

    }
  }


  ngOnInit(): void {
    if(this.isUpdate){
      this.form = this.formBuilder.group({
        id:[''],
        foodName: ['', Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required],
        img:['']
      });
  
      this.form.setValue({
        id: this.meals.id,
        foodName: this.meals.foodName,
        price: this.meals.price,
        description: this.meals.description,
        img:this.meals.img
      });
    }else{
      this.form = this.formBuilder.group({
        foodName: ['', Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required],
        img:['']
      });
  
      this.form.setValue({
        foodName: this.meals.foodName,
        price: this.meals.price,
        description: this.meals.description,
        img:this.meals.img
      });
    }
   
  }

  public addFile(event: any) {
    console.log(event)
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
    this.submitted = true;
    this.loading=true;
    
    if (this.form.invalid) { 
      this.loading=false;
      return;
    }
    if(this.isUpdate){
      this.editMeal()
    }else{
      this.saveMeals()

    }
  }

  saveMeals() {
    this.dashboardService.saveMeal(this.form.value).subscribe(response=>{
      console.log(response);
      if(response=="CREATED"){
        this.modalReference.cancel();
        this.toastr.success('Meal Added', 'Success!');
        this.loading=false;
        window.location.reload();
      }else{
        this.toastr.error('Failed to add Meal','Error');
        this.loading=false;
      }
     },(error) => {
      console.log(error.error);
      this.toastr.error('Please fill all the fields carefully','Error');
      this.loading=false;
  })
  }
  editMeal() {
    this.dashboardService.updateMeals(this.form.value).subscribe(response=>{
      console.log(response);
      if(response=="CREATED"){
        this.modalReference.cancel();
        this.toastr.success('Meal Updated', 'Success!');
        this.loading=false;
        window.location.reload();
      }else{
        this.toastr.error('Failed to update Meal','Error');
        this.loading=false;
      }
    },(error)=>{
      console.log(error.error);
        this.toastr.error('Please fill all the fields carefully','Error');
        this.loading=false;
    })
  }

}
