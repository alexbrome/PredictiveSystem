import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteWineChartsComponent } from './white-wine-charts.component';

describe('WhiteWineChartsComponent', () => {
  let component: WhiteWineChartsComponent;
  let fixture: ComponentFixture<WhiteWineChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteWineChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteWineChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
