import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RotinaService } from '../../core/services/rotina.service';

@Component({
  selector: 'app-rotinas',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SideMenuComponent, FooterComponent],
  templateUrl: './rotinas.component.html',
  styleUrl: './rotinas.component.css'
})
export class RotinasComponent {
  private rotinaService = inject(RotinaService);
  rotinas = this.rotinaService.getRotinasSignal();
}
