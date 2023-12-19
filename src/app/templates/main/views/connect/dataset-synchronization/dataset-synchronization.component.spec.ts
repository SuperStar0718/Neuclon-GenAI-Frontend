import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetSynchronizationComponent } from './dataset-synchronization.component';

describe('DatasetSynchronizationComponent', () => {
  let component: DatasetSynchronizationComponent;
  let fixture: ComponentFixture<DatasetSynchronizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetSynchronizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetSynchronizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
