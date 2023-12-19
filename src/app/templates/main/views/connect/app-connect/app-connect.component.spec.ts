import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConnectComponent } from './app-connect.component';

describe('AppConnectComponent', () => {
  let component: AppConnectComponent;
  let fixture: ComponentFixture<AppConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppConnectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
