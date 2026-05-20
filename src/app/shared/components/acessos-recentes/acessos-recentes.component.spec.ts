import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessosRecentesComponent } from './acessos-recentes.component';

describe('AcessosRecentesComponent', () => {
  let component: AcessosRecentesComponent;
  let fixture: ComponentFixture<AcessosRecentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessosRecentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessosRecentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
