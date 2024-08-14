import { TestBed } from '@angular/core/testing';

import { WhiteWineServiceService } from './white-wine-service.service';

describe('WhiteWineServiceService', () => {
  let service: WhiteWineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiteWineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
