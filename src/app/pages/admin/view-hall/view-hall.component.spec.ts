import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHallComponent } from './view-hall.component';

describe('ViewHallComponent', () => {
  let component: ViewHallComponent;
  let fixture: ComponentFixture<ViewHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
