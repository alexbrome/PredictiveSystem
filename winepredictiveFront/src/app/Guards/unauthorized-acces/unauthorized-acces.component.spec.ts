import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedAccesComponent } from './unauthorized-acces.component';

describe('UnauthorizedAccesComponent', () => {
  let component: UnauthorizedAccesComponent;
  let fixture: ComponentFixture<UnauthorizedAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizedAccesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
