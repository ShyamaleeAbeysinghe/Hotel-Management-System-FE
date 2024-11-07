import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { DashboardService } from '../../../../service/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';

interface Hall {
  id:number,
  hallName: string,
  price: number,
  chairs: number,
  tables: number,
  img: string
}


@Component({
  selector: 'app-hall',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule,NgxLoadingModule],
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.css'
})
export class HallComponent implements OnInit {
  [x: string]: any;
  form!: FormGroup;
  public url: any;
  loading = false;
  submitted = false;
  public isUpdate=false;
  public hall: Hall = {
    id:0,
    hallName: '',
    price: 0,
    chairs: 0,
    tables: 0,
    img: ''
  };

  constructor(private modalReference: ModalReference<Hall>,
    private formBuilder: FormBuilder, private dashboardService:DashboardService,private toastr: ToastrService) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.hall = copy;
      this.url=copy.img
      this.isUpdate=true
    }
  }
  ngOnInit(): void {
    if(this.isUpdate){
      this.form = this.formBuilder.group({
        id:[''],
        hallName: ['', Validators.required],
        price: ['', Validators.required],
        chairs: ['', Validators.required],
        tables: ['', Validators.required],
        img: ['', Validators.required]
  
      });
  
      this.form.setValue({
        id:this.hall.id,
        hallName: this.hall.hallName,
        price: this.hall.price,
        chairs: this.hall.chairs,
        tables: this.hall.tables,
        img: this.hall.img
  
      });
    }else{
      this.form = this.formBuilder.group({
        hallName: ['', Validators.required],
        price: ['', Validators.required],
        chairs: ['', Validators.required],
        tables: ['', Validators.required],
        img: ['', Validators.required]
  
      });
  
      this.form.setValue({
        hallName: this.hall.hallName,
        price: this.hall.price,
        chairs: this.hall.chairs,
        tables: this.hall.tables,
        img: this.hall.img
  
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
        })
        console.log(this.url)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log(this.form.value)
    if (this.form.invalid) {
      this.loading= false;
      return;
    }

    if(this.isUpdate){
      this.editHall();
    }else{
      this.saveHall();
    }
  }
  editHall() {
    this.dashboardService.updateHalls(this.form.value).subscribe(response=>{
      console.log(response);
      if(response=="CREATED"){
        this.modalReference.cancel();
        this.toastr.success('hall Updated', 'Success!');
        this.loading=false;
        window.location.reload();
      }else{
        this.toastr.error('Failed to update hall','Error');
        this.loading=false;
      }
    },(error)=>{
      console.log(error.error);
        this.toastr.error('Please fill all the fields carefully','Error');
        this.loading=false;
    })
  }

  saveHall() {
   this.dashboardService.saveHall(this.form.value).subscribe(response=>{
    console.log(response);
    if(response=="CREATED"){
      this.modalReference.cancel();
      this.toastr.success('Hall Created', 'Success!');
      this.loading=false;
      window.location.reload();
    }else{
      this.toastr.error('Failed to create Hall','Error');
      this.loading=false;
    }
   },(error) => {
    console.log(error.error);
    this.toastr.error('Please fill all the fields carefully','Error');
    this.loading=false;
})
  }
}
