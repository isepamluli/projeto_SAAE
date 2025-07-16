import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-reserva',
  templateUrl: './cadastro-reserva.page.html',
  styleUrls: ['./cadastro-reserva.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastroReservaPage {
  ambientes = [
    { nome: 'Auditório', icone: 'business-outline' },
    { nome: 'Laboratório 1', icone: 'laptop-outline' },
    { nome: 'Laboratório 2', icone: 'laptop-outline' },
    { nome: 'Laboratório 3', icone: 'laptop-outline' },
    { nome: 'Sala de Vídeo 1', icone: 'videocam-outline' },
    { nome: 'Sala de Vídeo 2', icone: 'videocam-outline' },
    { nome: 'Sala de Vídeo 3', icone: 'videocam-outline' },
    { nome: 'Laboratório de Ciências', icone: 'flask-outline' } // 🔬 Novo ambiente adicionado
  ];

  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  checkNotifications() {
    console.log('Notificações futuras');
  }

  selecionarAmbiente(ambiente: any) {
    this.router.navigateByUrl('/cadastro-reserva-data', {
      state: { ambienteSelecionado: ambiente }
    });
  }
}
