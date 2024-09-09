import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaderNavLogoComponent } from './hader-nav-logo.component';

describe('HaderNavLogoComponent', () => {
  let component: HaderNavLogoComponent;
  let fixture: ComponentFixture<HaderNavLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaderNavLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaderNavLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
