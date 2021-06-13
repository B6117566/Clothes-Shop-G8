import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCardItemAddComponent } from './manage-card-item-add.component';

describe('ManageCardItemAddComponent', () => {
  let component: ManageCardItemAddComponent;
  let fixture: ComponentFixture<ManageCardItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCardItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCardItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
