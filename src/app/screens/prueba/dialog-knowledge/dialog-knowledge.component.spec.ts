import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogKnowledgeComponent } from './dialog-knowledge.component';

describe('DialogKnowledgeComponent', () => {
  let component: DialogKnowledgeComponent;
  let fixture: ComponentFixture<DialogKnowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogKnowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
