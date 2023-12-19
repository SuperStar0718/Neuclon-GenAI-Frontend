import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AICollaboratorComponent } from './ai-collaborator.component';

describe('AICollaboratorComponent', () => {
  let component: AICollaboratorComponent;
  let fixture: ComponentFixture<AICollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AICollaboratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AICollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
