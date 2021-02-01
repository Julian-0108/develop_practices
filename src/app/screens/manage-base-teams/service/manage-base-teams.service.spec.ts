import { TestBed } from '@angular/core/testing';

import { ManageBaseTeamsService } from './manage-base-teams.service';

describe('ManageBaseTeamsService', () => {
  let service: ManageBaseTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageBaseTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
