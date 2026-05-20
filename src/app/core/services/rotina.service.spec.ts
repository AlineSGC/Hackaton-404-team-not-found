import { TestBed } from '@angular/core/testing';

import { RotinaService } from './rotina.service';

describe('RotinaService', () => {
  let service: RotinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
