import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedWineChartsComponent } from './red-wine-charts.component';

describe('RedWineChartsComponent', () => {
  let component: RedWineChartsComponent;
  let fixture: ComponentFixture<RedWineChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedWineChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedWineChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
