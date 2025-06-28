import { Component } from '@angular/core';
import { IonicModule, NavController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificacoesPage } from '../notificacoes/notificacoes.page'; // ajuste o caminho se necessário

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DashboardPage {
  recentBookings = [
    {
      title: 'Reunião de Planejamento',
      date: '15/05/2023',
      time: '14:00 - 15:30',
      room: 'Sala 101',
      status: 'Confirmado',
      statusColor: 'success'
    },
    {
      title: 'Apresentação de Projeto',
      date: '16/05/2023',
      time: '10:00 - 11:30',
      room: 'Auditório',
      status: 'Pendente',
      statusColor: 'warning'
    },
    {
      title: 'Treinamento de Equipe',
      date: '17/05/2023',
      time: '09:00 - 12:00',
      room: 'Sala 205',
      status: 'Cancelado',
      statusColor: 'danger'
    }
  ];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  openScheduling() {
    this.navCtrl.navigateForward('/cadastro-agenda');
  }

  viewAvailability() {
    this.navCtrl.navigateForward('/cadastro-disponibilidade');
  }

  cancelBooking() {
    this.navCtrl.navigateForward('/cancelar-agendamento');
  }

  viewReports() {
    this.navCtrl.navigateForward('/relatorios');
  }
  openScheduling1() {
  this.navCtrl.navigateForward('/perfil');
}

  

  async checkNotifications() {
    const modal = await this.modalCtrl.create({
      component: NotificacoesPage,
      breakpoints: [0, 0.75, 1],
      initialBreakpoint: 0.75,
      showBackdrop: true,
      canDismiss: true
    });

    await modal.present();
  }
}
