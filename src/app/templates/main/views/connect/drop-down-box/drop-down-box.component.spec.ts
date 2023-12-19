import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownBoxComponent } from './drop-down-box.component';

describe('DropDownBoxComponent', () => {
  let component: DropDownBoxComponent;
  let fixture: ComponentFixture<DropDownBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
