import { ComponentFixture, TestBed } from '@angular/core/testing';

import BikesDetailComponent from './bikes-detail.component';

describe('BikesDetailComponent', () => {
  let component: BikesDetailComponent;
  let fixture: ComponentFixture<BikesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BikesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
