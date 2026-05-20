import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotinasComponent } from './rotinas.component';

describe('RotinasComponent', () => {
  let component: RotinasComponent;
  let fixture: ComponentFixture<RotinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
