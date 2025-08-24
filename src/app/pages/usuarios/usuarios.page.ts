import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

interface Usuario {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  senhaHash?: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  form: FormGroup;
  modoEdicao = false;
  usuarioEditando: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private api: ApiService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      senhaHash: ['123456'],
    });
  }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.api.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Erro ao carregar usuários',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  iniciarCriacao() {
    this.modoEdicao = false;
    this.usuarioEditando = null;
    this.form.reset({ senhaHash: '123456' });
  }

  iniciarEdicao(usuario: Usuario) {
    this.modoEdicao = true;
    this.usuarioEditando = usuario;
    this.form.patchValue(usuario);
  }

  async salvar() {
    if (this.form.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos corretamente.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    const dados = this.form.value;

    if (this.modoEdicao && this.usuarioEditando?.id) {
      this.api.updateUsuario(this.usuarioEditando.id, dados).subscribe({
        next: async () => {
          this.carregarUsuarios();
          this.cancelarEdicao();
          const toast = await this.toastCtrl.create({
            message: 'Usuário atualizado com sucesso!',
            duration: 2000,
            color: 'success'
          });
          toast.present();
        },
        error: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Erro ao atualizar usuário.',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      });
    } else {
      this.api.createUsuario(dados).subscribe({
        next: async () => {
          this.carregarUsuarios();
          this.form.reset({ senhaHash: '123456' });
          const toast = await this.toastCtrl.create({
            message: 'Usuário criado com sucesso!',
            duration: 2000,
            color: 'success'
          });
          toast.present();
        },
        error: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Erro ao criar usuário.',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      });
    }
  }

  async confirmarExclusao(usuario: Usuario) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: `Deseja excluir o usuário ${usuario.nome}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.excluir(usuario);
          }
        }
      ]
    });
    await alert.present();
  }

  excluir(usuario: Usuario) {
    if (!usuario.id) return;
    this.api.deleteUsuario(usuario.id).subscribe({
      next: async () => {
        this.carregarUsuarios();
        const toast = await this.toastCtrl.create({
          message: 'Usuário deletado com sucesso!',
          duration: 2000,
          color: 'success'
        });
        toast.present();
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Erro ao deletar usuário.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  cancelarEdicao() {
    this.usuarioEditando = null;
    this.modoEdicao = false;
    this.form.reset({ senhaHash: '123456' });
  }
}
