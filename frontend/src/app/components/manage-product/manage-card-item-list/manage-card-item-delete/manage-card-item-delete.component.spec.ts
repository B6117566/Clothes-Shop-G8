import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCardItemDeleteComponent } from './manage-card-item-delete.component';

describe('ManageCardItemDeleteComponent', () => {
  let component: ManageCardItemDeleteComponent;
  let fixture: ComponentFixture<ManageCardItemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCardItemDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCardItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
