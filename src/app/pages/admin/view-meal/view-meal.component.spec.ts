import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMealComponent } from './view-meal.component';

describe('ViewMealComponent', () => {
  let component: ViewMealComponent;
  let fixture: ComponentFixture<ViewMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
