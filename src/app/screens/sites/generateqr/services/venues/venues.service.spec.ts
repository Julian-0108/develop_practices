/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VenuesService } from './venues.service';

describe('Service: Venues', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenuesService]
    });
  });

  it('should ...', inject([VenuesService], (service: VenuesService) => {
    expect(service).toBeTruthy();
  }));
});
