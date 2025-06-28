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

  // Variável para controlar a visibilidade da senha
  showPassword: boolean = false;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  // Método para alternar a visibilidade da senha
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

    // Simulação de autenticação
    setTimeout(() => {
      this.loading = false;
      if (this.email === 'admin@teste.com' && this.senha === '123456') {
        this.navCtrl.navigateRoot('/dashboard');
      } else {
        this.toastCtrl.create({
          message: 'Email ou senha incorretos.',
          duration: 2000,
          color: 'danger',
          position: 'top',
        }).then(toast => toast.present());
      }
    }, 1500);
  }

  goToRecuperarSenha() {
    this.navCtrl.navigateForward('/recuperar-senha');
  }

  goToCadastro() {
    this.navCtrl.navigateForward('/cadastro-funcionario');
  }
}
