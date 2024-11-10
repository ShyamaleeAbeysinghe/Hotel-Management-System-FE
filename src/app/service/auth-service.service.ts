import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLogin = false;

  roleAs!: string | "";
  hostUrl: string;

  constructor(private router: Router, private http: HttpClient) {
    this.hostUrl = "http://localhost:8080"
  }


  navigate(role: string) {
    this.isLogin = true;
    this.roleAs = role;
    if (role == "Admin") {
      window.localStorage.setItem("STATE", "true");
      window.localStorage.setItem("ROLE", role)
      this.router.navigate(['/admin/dashboard']);
    } else if (role == "Receptionist") {
      window.localStorage.setItem("STATE", "true");
      window.localStorage.setItem("ROLE", role)
      this.router.navigate(['/admin/view-room']);
    } else if (role == "Chef") {
      window.localStorage.setItem("STATE", "true");
      window.localStorage.setItem("ROLE", role)
      this.router.navigate(['/admin/view-meal']);
    } else if (role == "Room Boy") {
      window.localStorage.setItem("STATE", "true");
      window.localStorage.setItem("ROLE", role)
      this.router.navigate(['/admin/view-meal']);
    }
    // return of({ success: this.isLogin, role: this.roleAs });
  }

  public staffLogin(staff: any) {
    return this.http.post<any>(this.hostUrl + "/api/login/staff", staff);
  }

  public customerSignUp(customer: any) {
    return this.http.post<any>(this.hostUrl + "/api/customer/add", customer);
  }

  public customerLogin(customer: any) {
    return this.http.post<any>(this.hostUrl + "/api/login/customer", customer);
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
