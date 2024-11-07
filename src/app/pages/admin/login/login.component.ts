import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../service/auth-service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    form!: FormGroup;
    loading = false;
    submitted = false;
    showPassword: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authservice: AuthServiceService
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
        console.log(this.f['username'].value);
        console.log(this.f['password'].value);
        // this.authservice.login(this.f['username'].value,this.f['password'].value)
        let request = {
            username: this.f['username'].value,
            password: this.f['password'].value
        }
        this.authservice.staffLogin(request).subscribe(response => {
            console.log(response.status)
            if (response.status == "success") {
                let role = response.role;
                this.authservice.navigate(role);
            }
        })


    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
}
