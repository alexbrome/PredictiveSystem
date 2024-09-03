import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryWhiteWineComponent } from './summary-white-wine.component';

describe('SummaryWhiteWineComponent', () => {
  let component: SummaryWhiteWineComponent;
  let fixture: ComponentFixture<SummaryWhiteWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryWhiteWineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryWhiteWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
