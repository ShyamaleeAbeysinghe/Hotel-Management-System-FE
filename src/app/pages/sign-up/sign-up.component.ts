import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule,RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
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
      customerName:['',Validators.required],
      age : ['',Validators.required],
      address : ['',Validators.required],
      contact : ['',Validators.required],
      email : ['',Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;


    if (this.form.invalid) {
        return;
    }

   
    // this.authservice.login(this.f['username'].value,this.f['password'].value)
    
    this.authservice.customerSignUp(this.form.value).subscribe(response => {
        console.log(response)
        if(response=="CREATED"){
          this.router.navigate(['/signin']);
        }else{
          console.log("error save")
        }
        
    })


}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
}

}
