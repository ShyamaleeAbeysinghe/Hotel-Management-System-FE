import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthServiceService } from '../../service/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule,RouterModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {
  form!: FormGroup;
    loading = false;
    submitted = false;
    showPassword: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authservice: AuthServiceService,
        private toastr:ToastrService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;


        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        // this.authservice.login(this.f['username'].value,this.f['password'].value)
        let request = {
            username: this.f['username'].value,
            password: this.f['password'].value
        }

        this.authservice.customerLogin(request).subscribe(response => {
          if (response.status == "success") {
            console.log("response received");
            window.localStorage.setItem("user", response.user);
            window.localStorage.setItem("STATE", "true");
            window.localStorage.setItem("ROLE", "Customer")
            this.router.navigate(['/home']);
        }else{
          this.loading = false;
          this.toastr.error("Incorrect credintials","Error")
        }
        },(error)=>{
          this.loading = false;
          console.log("System maybe offline")
        })


    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
}
