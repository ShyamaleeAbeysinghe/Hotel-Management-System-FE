import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoomBookingComponent } from './view-room-booking.component';

describe('ViewRoomBookingComponent', () => {
  let component: ViewRoomBookingComponent;
  let fixture: ComponentFixture<ViewRoomBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRoomBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoomBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
