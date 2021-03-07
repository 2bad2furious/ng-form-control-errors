import { TestBed } from '@angular/core/testing';

import { StaticLoaderService } from './static-loader.service';

describe('StaticLoaderService', () => {
  let service: StaticLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
