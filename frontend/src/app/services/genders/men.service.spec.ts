import { TestBed } from '@angular/core/testing';

import { MenService } from './men.service';

describe('MenService', () => {
  let service: MenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
