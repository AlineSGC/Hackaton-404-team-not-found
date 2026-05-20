import { Injectable, signal } from '@angular/core';

export interface Atalho {
  id: string;
  nome: string;
  url: string;
  fixado: boolean;
  observacoes: string;
}

@Injectable({
  providedIn: 'root'
})
export class AtalhoService {
  private atalhos = signal<Atalho[]>([
    { id: '1', nome: 'Google', url: 'https://www.google.com', fixado: true, observacoes: 'Mecanismo de busca principal da empresa.' },
    { id: '2', nome: 'YouTube', url: 'https://www.youtube.com', fixado: true, observacoes: 'Plataforma para hospedagem de vídeos institucionais.' },
    { id: '3', nome: 'GitHub', url: 'https://www.github.com', fixado: true, observacoes: 'Repositório oficial dos projetos de código aberto.' },
    { id: '4', nome: 'Stack Overflow', url: 'https://stackoverflow.com', fixado: true, observacoes: 'Fórum de auxílio para a equipe de desenvolvimento.' },
    { id: '5', nome: 'Wikipedia', url: 'https://www.wikipedia.org', fixado: true, observacoes: 'Fonte de consulta geral e pesquisa rápida.' },
    { id: '6', nome: 'Portal do Aluno', url: 'https://aluno.universidade.edu.br', fixado: true, observacoes: 'Acesso às notas e frequência escolar.' },
    { id: '7', nome: 'Sistema ERP', url: 'https://erp.empresa.com.br', fixado: true, observacoes: 'Gestão financeira e faturamento interno.' },
    { id: '8', nome: 'Trello', url: 'https://trello.com', fixado: true, observacoes: 'Organização de tarefas e projetos em kanban.' }
  ]);

  getAtalhosSignal() {
    return this.atalhos;
  }

  toggleFixado(id: string) {
    this.atalhos.update(atalhos => 
      atalhos.map(a => a.id === id ? { ...a, fixado: !a.fixado } : a)
    );
  }

  excluirAtalho(id: string) {
    this.atalhos.update(atalhos => atalhos.filter(a => a.id !== id));
  }
}
