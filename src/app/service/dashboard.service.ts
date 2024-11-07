import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private hostUrl: string;
  constructor(private http: HttpClient) { 
    this.hostUrl="http://localhost:8080"
  }

  public saveRoom(room: any) {
    return this.http.post<any>(this.hostUrl+"/api/room/add-room", room);
  }

  public getAllRooms() {
    return this.http.get<any>(this.hostUrl+"/api/room/get-all");
  }
  public updateRooms(room:any) {
    return this.http.put<any>(this.hostUrl+"/api/room/update-room",room);
  }
  public deleteRooms(id:any) {
    return this.http.delete<any>(this.hostUrl+"/api/room/delete-room/"+id);
  }



  public saveHall(hall: any) {
    return this.http.post<any>(this.hostUrl+"/api/hall/add", hall);
  }

  public getAllHalls() {
    return this.http.get<any>(this.hostUrl+"/api/hall/get-all");
  }
  public updateHalls(hall:any) {
    return this.http.put<any>(this.hostUrl+"/api/hall/update-hall",hall);
  }
  public deleteHalls(id:any) {
    return this.http.delete<any>(this.hostUrl+"/api/hall/delete-hall/"+id);
  }


  public saveMeal(meal: any) {
    return this.http.post<any>(this.hostUrl+"/api/resturentMenu/add-resturentMenu", meal);
  }

  public getAllMeals() {
    return this.http.get<any>(this.hostUrl+"/api/resturentMenu/get-all");
  }
  public updateMeals(meal:any) {
    return this.http.put<any>(this.hostUrl+"/api/resturentMenu/update-resturentMenu",meal);
  }
  public deleteMeals(id:any) {
    return this.http.delete<any>(this.hostUrl+"/api/resturentMenu/delete-resturentMenu/"+id);
  }

 

  public getAllCustomers() {
    return this.http.get<any>(this.hostUrl+"/api/customer/get-all");
  }
  public deleteCustomers(id:any) {
    return this.http.delete<any>(this.hostUrl+"/api/customer/delete/"+id);
  }


  public saveStaff(staff: any) {
    return this.http.post<any>(this.hostUrl+"/api/staff/add-staff", staff);
  }

  public getAllStaff() {
    return this.http.get<any>(this.hostUrl+"/api/staff/get-all");
  }
  public updateStaff(staff:any) {
    return this.http.put<any>(this.hostUrl+"/api/staff/update-staff",staff);
  }
  public deleteStaff(id:any) {
    return this.http.delete<any>(this.hostUrl+"/api/staff/delete-staff/"+id);
  }

  public getRoles() {
    return this.http.get<any>(this.hostUrl+"/api/role/get-all");
  }
}
