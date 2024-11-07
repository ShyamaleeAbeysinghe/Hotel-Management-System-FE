import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardService } from '../../../service/dashboard.service';
import { ToastrService } from 'ngx-toastr';

interface Staff {
  id:number,
  firstName: string,
  lastName: string,
  address: string,
  contact: string,
  nic: string,
  role: number

}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  public isUpdate=false;
  roles: any;
  public staff: Staff = {
    id:0,
    firstName: '',
    lastName: '',
    address: '',
    contact: '',
    nic: '',
    role: 0
  };

  constructor(private modalReference: ModalReference<Staff>,
    private formBuilder: FormBuilder, private dashboardService: DashboardService,private toastr: ToastrService) {
    if (this.modalReference.config.model) {
      let copy = this.modalReference.config.model;
      this.staff = copy;
      this.isUpdate=true;

    }
  }

  ngOnInit(): void {
    if(this.isUpdate){
      this.form = this.formBuilder.group({
        id:[''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        contact: ['', Validators.required],
        nic: ['', Validators.required],
        role: ['', Validators.required]
      });
  
      this.form.setValue({
        id:this.staff.id,
        firstName: this.staff.firstName,
        lastName: this.staff.lastName,
        address: this.staff.address,
        contact: this.staff.contact,
        nic: this.staff.nic,
        role: this.staff.role
      });
      
    }else{
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        contact: ['', Validators.required],
        nic: ['', Validators.required],
        role: ['', Validators.required]
      });
  
      this.form.setValue({
        firstName: this.staff.firstName,
        lastName: this.staff.lastName,
        address: this.staff.address,
        contact: this.staff.contact,
        nic: this.staff.nic,
        role: this.staff.role
      });
    }
    
    this.dashboardService.getRoles().subscribe(response => {
      if (response != null) {
        this.roles = response
      }
    })
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
    if(this.isUpdate){
      this.editStaff()
    }else{
      this.saveStaff();
    }
    


  }
  editStaff() {
    this.dashboardService.updateStaff(this.form.value).subscribe(response=>{
      console.log(response);
      if(response=="CREATED"){
        this.modalReference.cancel();
        this.toastr.success('Staff Updated', 'Success!');
        this.loading=false;
        window.location.reload();
      }else{
        this.toastr.error('Failed to update Staff','Error');
        this.loading=false;
      }
    },(error)=>{
      console.log(error.error);
        this.toastr.error('Please fill all the fields carefully','Error');
        this.loading=false;
    })
  }

  saveStaff() {
    this.dashboardService.saveStaff(this.form.value).subscribe(response=>{
      console.log(response);
      if(response=="CREATED"){
        this.modalReference.cancel();
        this.toastr.success('Staff Added', 'Success!');
        this.loading=false;
        window.location.reload();
      }else{
        this.toastr.error('Failed to save staff','Error');
        this.loading=false;
      }
    },
    (error) => {
        console.log(error.error);
        this.toastr.error('Please fill all the fields carefully','Error');
        this.loading=false;
    })
  }

}
