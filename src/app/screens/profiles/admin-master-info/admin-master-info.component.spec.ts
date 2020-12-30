import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMasterInfoComponent } from './admin-master-info.component';

describe('AdminMasterInfoComponent', () => {
  let component: AdminMasterInfoComponent;
  let fixture: ComponentFixture<AdminMasterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMasterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMasterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
