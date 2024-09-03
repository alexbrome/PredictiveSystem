import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineListPageComponent } from './wine-list-page.component';

describe('WineListPageComponent', () => {
  let component: WineListPageComponent;
  let fixture: ComponentFixture<WineListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
