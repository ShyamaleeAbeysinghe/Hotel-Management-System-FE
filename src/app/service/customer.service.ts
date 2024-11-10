import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private hostUrl: string;
  constructor(private http: HttpClient) { 
    this.hostUrl="http://localhost:8080"
  }

  public getAllRooms() {
    return this.http.get<any>(this.hostUrl+"/api/room/get-all");
  }

  public getAvailableRooms(start:any,end:any) {
    return this.http.get<any>(this.hostUrl+"/api/room-booking/get-availableRoom?start="+start+"&end="+end);
  }

  public getAllHalls() {
    return this.http.get<any>(this.hostUrl+"/api/hall/get-all");
  }

  public getAvailableHalls(bookingDate:any) {
    return this.http.get<any>(this.hostUrl+"/api/hall-booking/get-availableHall?date="+bookingDate);
  }

  public saveRoomBooking(booking: any) {
    return this.http.post<any>(this.hostUrl+"/api/room-booking/saveBooking", booking);
  }

  public saveHallBooking(booking: any) {
    return this.http.post<any>(this.hostUrl+"/api/hall-booking/saveBooking", booking);
  }

  public getAllRoomBookings() {
    return this.http.get<any>(this.hostUrl+"/api/room-booking/getAll");
  }
}
