import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineListComponent } from './wine-list.component';

describe('WineListComponent', () => {
  let component: WineListComponent;
  let fixture: ComponentFixture<WineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
