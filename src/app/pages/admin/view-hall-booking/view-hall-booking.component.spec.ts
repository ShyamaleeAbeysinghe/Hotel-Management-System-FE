import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHallBookingComponent } from './view-hall-booking.component';

describe('ViewHallBookingComponent', () => {
  let component: ViewHallBookingComponent;
  let fixture: ComponentFixture<ViewHallBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHallBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHallBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
