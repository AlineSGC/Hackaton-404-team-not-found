import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RotinaService } from '../../../../core/services/rotina.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adicionar-rotina-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adicionar-rotina-modal.component.html',
  styleUrl: './adicionar-rotina-modal.component.css'
})
export class AdicionarRotinaModalComponent {
  @Output() close = new EventEmitter<void>();
  
  rotinaForm: FormGroup;
  private fb = inject(FormBuilder);
  private rotinaService = inject(RotinaService);

  loading = false;

  constructor() {
    this.rotinaForm = this.fb.group({
      titulo: ['', Validators.required],
      link: ['', Validators.required],
      descricao: ['', Validators.required],
      icone: ['playlist-add-circle0.svg']
    });
  }

  onSave() {
    if (this.rotinaForm.valid) {
      this.loading = true;
      this.rotinaService.adicionarRotina(this.rotinaForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.close.emit();
        },
        error: (err) => {
          this.loading = false;
          console.error('Error adding rotina', err);
        }
      });
    } else {
      this.rotinaForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.close.emit();
  }
}
