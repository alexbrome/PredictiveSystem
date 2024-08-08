import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteWinePageComponent } from './white-wine-page.component';

describe('WhiteWinePageComponent', () => {
  let component: WhiteWinePageComponent;
  let fixture: ComponentFixture<WhiteWinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteWinePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteWinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
