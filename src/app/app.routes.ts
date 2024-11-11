import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HeaderComponent } from './pages/header/header.component';
import { ViewRoomComponent } from './pages/admin/view-room/view-room.component';
import { ViewHallComponent } from './pages/admin/view-hall/view-hall.component';
import { ViewStaffComponent } from './pages/admin/view-staff/view-staff.component';
import { ViewMealComponent } from './pages/admin/view-meal/view-meal.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { authGuard } from './auth.guard';
import { ViewCustomerComponent } from './pages/admin/view-customer/view-customer.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CustomerLoginComponent } from './pages/customer-login/customer-login.component';
import { HomeComponent } from './pages/home/home.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { ViewRoomBookingComponent } from './pages/admin/view-room-booking/view-room-booking.component';
import { DiningComponent } from './pages/dining/dining.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  
// {
//   path:"",
//   redirectTo : '/home' ,
//   pathMatch : 'full'
// },
{
  path:"admin",
  redirectTo : '/admin/dashboard' ,
  pathMatch : 'full'
},
{
    path:"admin/dashboard",
    component:DashboardComponent,
    canActivate: [authGuard],
    data: {
      roles: ['Admin']
    }
},
{
    path:"admin/view-room",
    component:ViewRoomComponent,
    canActivate: [authGuard],
    data: {
      roles:['Admin','Receptionist']
    }
},
{
    path:"admin/view-hall",
    component:ViewHallComponent,
    canActivate: [authGuard],
    data: {
      roles: ['Admin']
    }
},
{
    path:"admin/view-staff",
    component:ViewStaffComponent,
    canActivate: [authGuard],
    data: {
      roles: ['Admin']
    }
},
{
    path:"admin/view-meal",
    component:ViewMealComponent,
    canActivate: [authGuard],
    data: {
      roles: ['Admin','Chef','Room Boy']
    }
},
{
    path:"admin/room=booking",
    component:ViewRoomBookingComponent,
    canActivate: [authGuard],
    data: {
      roles: ['Admin']
    }
},
{
    path:"admin/login",
    component:LoginComponent
},
{
    path:"admin/view-customer",
    component:ViewCustomerComponent,
    canActivate: [authGuard],
    data: {
      roles: ['Admin']
    }
},
{
    path:"signUp",
    component:SignUpComponent
},
{
    path:"signin",
    component:CustomerLoginComponent
},
{
    path:"home",
    component:HomeComponent
},
{
    path:"booking",
    component:MyBookingComponent
},
{
    path:"dining",
    component:DiningComponent
},
{
    path:"cart",
    component:CartComponent
}
];
