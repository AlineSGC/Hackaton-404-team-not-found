import { TestBed } from '@angular/core/testing';

import { AtalhoService } from './atalho.service';

describe('AtalhoService', () => {
  let service: AtalhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtalhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
