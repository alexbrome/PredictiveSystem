import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedWinePageComponent } from './red-wine-page.component';

describe('RedWinePageComponent', () => {
  let component: RedWinePageComponent;
  let fixture: ComponentFixture<RedWinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedWinePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedWinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
