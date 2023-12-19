import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointjsComponent } from './jointjs.component';

describe('JointjsComponent', () => {
  let component: JointjsComponent;
  let fixture: ComponentFixture<JointjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JointjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
