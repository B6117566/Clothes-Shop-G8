import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCardItemEditComponent } from './manage-card-item-edit.component';

describe('ManageCardItemEditComponent', () => {
  let component: ManageCardItemEditComponent;
  let fixture: ComponentFixture<ManageCardItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCardItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCardItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
