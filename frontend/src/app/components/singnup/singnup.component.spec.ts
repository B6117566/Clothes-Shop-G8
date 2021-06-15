import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingnupComponent } from './singnup.component';

describe('SingnupComponent', () => {
  let component: SingnupComponent;
  let fixture: ComponentFixture<SingnupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingnupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingnupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
