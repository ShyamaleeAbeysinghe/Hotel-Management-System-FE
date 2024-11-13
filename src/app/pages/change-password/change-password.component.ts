import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../service/auth-service.service';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatDialogModule, MatOptionModule, MatSelectModule, FormsModule, MatFormFieldModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  formpw: FormGroup;
  showCurrentPassword: boolean = false;
  showPassword: boolean = false;
  showRePassword: boolean = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,private authService:AuthServiceService,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    this.formpw = this.fb.group({
      currentpw: ['', [Validators.required]],
      newpw: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmpw: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  submit(formpw: NgForm) {
    this.submitted = true;

    console.log(this.formpw)
    if (this.formpw.invalid) {
      return;
    }
    if(this.f['newpw'].value!=this.f['confirmpw'].value){
        this.toastr.error("Confirm password didn't match","Error");
        return;
    }
    let customer={
      id:localStorage.getItem("user"),
      oldPassword:this.f['currentpw'].value,
      newPassword:this.f['newpw'].value
    }

    this.authService.updatePassword(customer).subscribe(response=>{
      if(response.status=="success"){
        this.dialogRef.close({
          clicked: 'updated',
        });
      }else{
        this.toastr.error(response.reason,"Error");
      }
    })
    
    
  }

  get f() { return this.formpw.controls; }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
  showHideCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  showHideRePassword() {
    this.showRePassword = !this.showRePassword;
  }
}
