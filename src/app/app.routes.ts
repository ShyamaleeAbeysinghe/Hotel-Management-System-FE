import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HeaderComponent } from './pages/header/header.component';
import { ViewRoomComponent } from './pages/admin/view-room/view-room.component';
import { ViewHallComponent } from './pages/admin/view-hall/view-hall.component';
import { ViewStaffComponent } from './pages/admin/view-staff/view-staff.component';
import { ViewMealComponent } from './pages/admin/view-meal/view-meal.component';

export const routes: Routes = [
{
    path:"admin/dashboard",
    component:DashboardComponent
},
{
    path:"admin/dashboard1",
    component:HeaderComponent
},
{
    path:"admin/view-room",
    component:ViewRoomComponent
},
{
    path:"admin/view-hall",
    component:ViewHallComponent
},
{
    path:"admin/view-staff",
    component:ViewStaffComponent
},
{
    path:"admin/view-meal",
    component:ViewMealComponent
}
];
