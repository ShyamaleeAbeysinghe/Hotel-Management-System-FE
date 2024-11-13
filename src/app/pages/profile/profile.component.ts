import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AuthServiceService } from '../../service/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,MatFormFieldModule,
    ReactiveFormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  form: FormGroup;
  dataFromDialog: any;
  customer:any;
  constructor(
    private fb: FormBuilder,private dialog: MatDialog,private authService:AuthServiceService,
    private toastr:ToastrService){
      this.form = this.fb.group({
        id:[localStorage.getItem("user")],
        customerName: ['', Validators.required],
        age: ['', Validators.required],
        address: ['', Validators.required],
        contact: ['', Validators.required],
        email: ['', Validators.required]
      });
  }
  ngOnInit(): void {
    this.authService.getCustomerDetails(localStorage.getItem("user")).subscribe(response=>{
      this.customer=response;
      this.form.setValue({
        id:localStorage.getItem("user"),
        customerName:response.customerName,
        age:response.age,
        address:response.address,
        contact:response.contact,
        email:response.email
      });
    }, (error) => {
      this.toastr.error("Something went wrong", "Error")
    })
  }
  showPrompt(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      disableClose: true,
      width: '60vw',
      height: '70vh',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.clicked === 'updated') {
        this.toastr.success("Profile Updated","Success")
      }
    });
  }
  onSubmit() {
    if (this.form.invalid) {
        return;
    }
    
    this.authService.customerupdate(this.form.value).subscribe(response => {
        console.log(response)
        if(response=="ACCEPTED"){
          this.toastr.success("Profile Updated","Success")
        }else{
          this.toastr.error("Something went wrong","Error")
        }
        
    })
  }
}
