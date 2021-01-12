import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBaseTeamsComponent } from './manage-base-teams.component';

describe('ManageBaseTeamsComponent', () => {
  let component: ManageBaseTeamsComponent;
  let fixture: ComponentFixture<ManageBaseTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBaseTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBaseTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
