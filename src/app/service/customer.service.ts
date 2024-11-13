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

  public getActiveRoomBookings(user:any) {
    return this.http.get<any>(this.hostUrl+"/api/room-booking/getAllActive?userId="+user);
  }

  
  public getAllRoomBookings() {
    return this.http.get<any>(this.hostUrl+"/api/room-booking/getAllBookings");
  }

  public getAllHallBookings(user:any) {
    return this.http.get<any>(this.hostUrl+"/api/hall-booking/getAllByCustomer?userId="+user);
  }

  public cancelRoomBooking(bookingId:number) {
    return this.http.post<any>(this.hostUrl+"/api/room-booking/cancelBooking/"+bookingId,null);
  }

  public cancelHallBooking(bookingId:number) {
    return this.http.post<any>(this.hostUrl+"/api/hall-booking/cancelBooking/"+bookingId,null);
  }

  public getAllResturantMenu() {
    return this.http.get<any>(this.hostUrl+"/api/resturentMenu/get-all");
  }

  public isCustomerCheckedIn(user:any) {
    return this.http.get<any>(this.hostUrl+"/api/room-booking/isCustomerCheckedIn/"+user);
  }

  public placeOrder(order: any) {
    return this.http.post<any>(this.hostUrl+"/api/order/add-order", order);
  }

  public getOrderByCustomer(customerId: any) {
    return this.http.get<any>(this.hostUrl+"/api/order/getAllByCustomer/"+customerId);
  }

  public cancelOrder(orderId: any) {
    return this.http.delete<any>(this.hostUrl+"/api/order/delete-order/"+orderId);
  }
}
