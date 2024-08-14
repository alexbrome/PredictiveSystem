import { TestBed } from '@angular/core/testing';

import { RedWineServiceService } from './red-wine-service.service';

describe('RedWineServiceService', () => {
  let service: RedWineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedWineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
