import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, delay, tap } from 'rxjs';

export interface Rotina {
  titulo: string;
  descricao: string;
  icone: string;
  link?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RotinaService {
  private rotinas = signal<Rotina[]>([
    { titulo: 'Abertura de Conta', descricao: 'Inicie o processo de abertura de conta completo.', icone: 'account-circle0.svg', link: 'https://siac.caixa.gov.br' },
    { titulo: 'Habitação', descricao: 'Atendimento de crédito imobiliário e financiamentos.', icone: 'maps-home-work0.svg', link: 'https://habitacao.caixa.gov.br' },
    { titulo: 'Social', descricao: 'Benefícios sociais, FGTS e programas governamentais.', icone: 'handshake0.svg', link: 'https://social.caixa.gov.br' },
    { titulo: 'Pessoa Jurídica', descricao: 'Produtos e serviços para empresas e MEIs.', icone: 'gavel0.svg', link: 'https://pj.caixa.gov.br' },
    { titulo: 'Cobrança', descricao: 'Boletos, títulos e gestão de cobranças bancárias.', icone: 'request-page0.svg', link: 'https://cobranca.caixa.gov.br' },
    { titulo: 'Jurídico', descricao: 'Atendimento de crédito imobiliário e financiamentos.', icone: 'balance0.svg', link: 'https://juridico.caixa.gov.br' },
    { titulo: 'Precatório / RPV', descricao: 'Gestão de precatórios e requisições de pagamento.', icone: 'gavel1.svg', link: 'https://precatorio.caixa.gov.br' },
    { titulo: 'Normativo', descricao: 'Consulta a normas, circulares e regulamentações.', icone: 'policy0.svg', link: 'https://normativo.caixa.gov.br' }
  ]);

  constructor(private http: HttpClient) {}

  getRotinasSignal() {
    return this.rotinas;
  }

  adicionarRotina(novaRotina: Rotina): Observable<Rotina> {
    if (environment.useMock) {
      return of(novaRotina).pipe(
        delay(500),
        tap(rotina => {
          this.rotinas.update(rotinas => [...rotinas, rotina]);
        })
      );
    } else {
      return this.http.post<Rotina>(`${environment.apiUrl}/rotinas`, novaRotina).pipe(
        tap(rotina => {
          this.rotinas.update(rotinas => [...rotinas, rotina]);
        })
      );
    }
  }
}
