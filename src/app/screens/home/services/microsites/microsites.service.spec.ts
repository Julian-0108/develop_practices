/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MicrositesService } from './microsites.service';

describe('Service: Microsites', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MicrositesService]
    });
  });

  it('should ...', inject([MicrositesService], (service: MicrositesService) => {
    expect(service).toBeTruthy();
  }));
});
