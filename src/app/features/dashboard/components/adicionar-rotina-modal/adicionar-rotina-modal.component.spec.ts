import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarRotinaModalComponent } from './adicionar-rotina-modal.component';

describe('AdicionarRotinaModalComponent', () => {
  let component: AdicionarRotinaModalComponent;
  let fixture: ComponentFixture<AdicionarRotinaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarRotinaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarRotinaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
