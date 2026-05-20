import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtalhoService } from '../../core/services/atalho.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-atalhos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SideMenuComponent, FooterComponent],
  templateUrl: './atalhos.component.html',
  styleUrl: './atalhos.component.css'
})
export class AtalhosComponent {
  atalhoService = inject(AtalhoService);
  atalhos = this.atalhoService.getAtalhosSignal();

  togglePin(id: string) {
    this.atalhoService.toggleFixado(id);
  }

  deleteAtalho(id: string) {
    this.atalhoService.excluirAtalho(id);
  }
}
