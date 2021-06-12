import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCardItemListComponent } from './manage-card-item-list.component';

describe('ManageCardItemListComponent', () => {
  let component: ManageCardItemListComponent;
  let fixture: ComponentFixture<ManageCardItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCardItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCardItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
