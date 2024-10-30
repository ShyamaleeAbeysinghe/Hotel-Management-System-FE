import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableHallComponent } from './available-hall.component';

describe('AvailableHallComponent', () => {
  let component: AvailableHallComponent;
  let fixture: ComponentFixture<AvailableHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableHallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
