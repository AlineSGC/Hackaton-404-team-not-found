import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RotinaCardComponent } from '../../shared/components/rotina-card/rotina-card.component';
import { AcessosRecentesComponent } from '../../shared/components/acessos-recentes/acessos-recentes.component';
import { FavoritosAnotacoesComponent } from '../../shared/components/favoritos-anotacoes/favoritos-anotacoes.component';
import { AdicionarRotinaModalComponent } from './components/adicionar-rotina-modal/adicionar-rotina-modal.component';
import { RotinaService } from '../../core/services/rotina.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    SideMenuComponent, 
    FooterComponent, 
    RotinaCardComponent, 
    AcessosRecentesComponent, 
    FavoritosAnotacoesComponent,
    AdicionarRotinaModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private rotinaService = inject(RotinaService);
  rotinas = this.rotinaService.getRotinasSignal();
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
