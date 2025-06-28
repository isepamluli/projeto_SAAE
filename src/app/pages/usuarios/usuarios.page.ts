import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  nivel: 'Admin' | 'Gerente' | 'Funcionário';
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
export class UsuariosPage {
  usuarios: Usuario[] = [];
  form: FormGroup;
  modoEdicao = false;
  usuarioEditando: Usuario | null = null;

  niveis = ['Admin', 'Gerente', 'Funcionário'];

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      nivel: ['Funcionário', Validators.required],
    });
  }

  ngOnInit() {
    this.usuarios = [
      { id: 1, nome: 'João Silva', email: 'joao@email.com', nivel: 'Admin' },
      { id: 2, nome: 'Maria Souza', email: 'maria@email.com', nivel: 'Gerente' },
    ];
  }

  iniciarCriacao() {
    this.modoEdicao = false;
    this.usuarioEditando = null;
    this.form.reset({ nivel: 'Funcionário' });
  }

  iniciarEdicao(usuario: Usuario) {
    this.modoEdicao = true;
    this.usuarioEditando = usuario;
    this.form.setValue({
      nome: usuario.nome,
      email: usuario.email,
      nivel: usuario.nivel,
    });
  }

  async salvar() {
    if (this.form.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos corretamente.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    const dados = this.form.value;

    if (this.modoEdicao && this.usuarioEditando) {
      const index = this.usuarios.findIndex(u => u.id === this.usuarioEditando!.id);
      if (index > -1) {
        this.usuarios[index] = { id: this.usuarioEditando.id, ...dados };
      }
      this.usuarioEditando = null;
      this.modoEdicao = false;
    } else {
      const novoId = this.usuarios.length ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
      this.usuarios.push({ id: novoId, ...dados });
    }

    this.form.reset({ nivel: 'Funcionário' });
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
          },
        },
      ],
    });
    await alert.present();
  }

  excluir(usuario: Usuario) {
    this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
  }

  cancelarEdicao() {
    this.usuarioEditando = null;
    this.modoEdicao = false;
    this.form.reset({ nivel: 'Funcionário' });
  }
}
