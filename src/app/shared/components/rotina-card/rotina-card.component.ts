import { Component, Input } from '@angular/core';
import { Rotina } from '../../../core/services/rotina.service';

@Component({
  selector: 'app-rotina-card',
  standalone: true,
  templateUrl: './rotina-card.component.html',
  styleUrl: './rotina-card.component.css'
})
export class RotinaCardComponent {
  @Input() rotina!: Rotina;

  onCardClick() {
    if (this.rotina.link) {
      window.open(this.rotina.link, '_blank');
    }
  }
}
