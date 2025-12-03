import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTablePage } from './time-table-page';

describe('TimeTablePage', () => {
  let component: TimeTablePage;
  let fixture: ComponentFixture<TimeTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTablePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
