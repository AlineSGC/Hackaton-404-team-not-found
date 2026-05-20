import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotinaCardComponent } from './rotina-card.component';

describe('RotinaCardComponent', () => {
  let component: RotinaCardComponent;
  let fixture: ComponentFixture<RotinaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotinaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotinaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
