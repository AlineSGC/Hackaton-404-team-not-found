import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acessos-recentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acessos-recentes.component.html',
  styleUrl: './acessos-recentes.component.css'
})
export class AcessosRecentesComponent {
  recentes = [
    { titulo: 'Cobrança', icone: 'request-page1.svg' },
    { titulo: 'Jurídico', icone: 'balance1.svg' },
    { titulo: 'Precatório / RPV', icone: 'gavel2.svg' },
    { titulo: 'Normativo', icone: 'policy1.svg' }
  ];
}
