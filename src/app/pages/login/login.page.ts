import { Component } from '@angular/core';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class LoginPage {
  email: string = '';
  senha: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    if (!this.email || !this.senha) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, preencha todos os campos.',
        duration: 2000,
        color: 'danger',
        position: 'top',
      });
      toast.present();
      return;
    }

    this.loading = true;

    setTimeout(async () => {
      this.loading = false;

      const usuarios = [
        { email: 'professor@teste.com', senha: '123456', tipo: 'Professor' },
        { email: 'coordenador@teste.com', senha: '123456', tipo: 'Coordenador' },
        { email: 'diretor@teste.com', senha: '123456', tipo: 'Diretor' },
        { email: 'chefe.ti@teste.com', senha: '123456', tipo: 'Chefe de TI' },
        { email: 'administrativo@teste.com', senha: '123456', tipo: 'Funcionário Administrativo' }
      ];

      const usuario = usuarios.find(u => u.email === this.email && u.senha === this.senha);

      if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify({ tipo: usuario.tipo }));
        this.navCtrl.navigateRoot('/dashboard');
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Email ou senha incorretos.',
          duration: 2000,
          color: 'danger',
          position: 'top',
        });
        toast.present();
      }
    }, 1000);
  }

  goToRecuperarSenha() {
    this.navCtrl.navigateForward('/recuperar-senha');
  }

  goToCadastro() {
    this.navCtrl.navigateForward('/cadastro-funcionario');
  }
}
