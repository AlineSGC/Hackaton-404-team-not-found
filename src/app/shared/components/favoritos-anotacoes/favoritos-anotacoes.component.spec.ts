import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosAnotacoesComponent } from './favoritos-anotacoes.component';

describe('FavoritosAnotacoesComponent', () => {
  let component: FavoritosAnotacoesComponent;
  let fixture: ComponentFixture<FavoritosAnotacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosAnotacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritosAnotacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
