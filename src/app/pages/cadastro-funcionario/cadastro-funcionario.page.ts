import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.page.html',
  styleUrls: ['./cadastro-funcionario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class CadastroFuncionarioPage {
  funcionario = {
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipo: ''
  };

  tiposFuncionario = [
    { id: 1, cargo: 'Professor' },
    { id: 2, cargo: 'Coordenador' },
    { id: 3, cargo: 'Diretor' },
    { id: 4, cargo: 'Chefe de TI' },
    { id: 5, cargo: 'Funcionário Administrativo' }
  ];

  showPassword = false;
  loading = false;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private api: ApiService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async cadastrarFuncionario() {
    if (this.funcionario.senha !== this.funcionario.confirmarSenha) {
      await this.mostrarToast('As senhas não coincidem', 'danger');
      return;
    }

    this.loading = true;

    this.api.createUsuario({
      nome: this.funcionario.nome,
      email: this.funcionario.email,
      telefone: this.funcionario.telefone,
      senha: this.funcionario.senha   // ✅ backend espera "senha"
    }).subscribe({
      next: async () => {
        this.loading = false;
        await this.mostrarToast('Cadastro realizado com sucesso!', 'success');
        this.router.navigate(['/dashboard']);
      },
      error: async (err) => {
        this.loading = false;
        console.error("❌ Erro ao cadastrar:", err);
        await this.mostrarToast(
          err?.error?.error || 'Erro ao cadastrar funcionário!',
          'danger'
        );
      }
    });
  }

  async mostrarToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor,
      position: 'top'
    });
    await toast.present();
  }
}
