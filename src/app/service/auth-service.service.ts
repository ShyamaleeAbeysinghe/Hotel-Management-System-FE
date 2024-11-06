import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLogin = false;

  roleAs!: string | "";

  constructor(private router: Router) { }

  
  login(username: string, password: string) {
    this.isLogin = true;
    if (username == "admin") {
      window.localStorage.setItem("STATE", "true");
      window.localStorage.setItem("ROLE", "Admin")
      this.roleAs = "Admin";
      this.router.navigate(['/admin/dashboard']);
    } else if (username == "reception") {
      window.localStorage.setItem("STATE", "true");
      window.localStorage.setItem("ROLE", "Reception")
      this.roleAs = "Reception";
      this.router.navigate(['/admin/view-room']);
    }
    // return of({ success: this.isLogin, role: this.roleAs });
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    this.router.navigate(['/admin/login']);
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE') || "";
    return this.roleAs;
  }
}
