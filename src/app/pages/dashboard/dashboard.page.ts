import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ModalController } from '@ionic/angular';
import { NotificacoesPage } from '../notificacoes/notificacoes.page';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule] // ← IMPORTANTE!
})
export class DashboardPage implements OnInit {
  tipoUsuario: string = '';

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

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('usuarioLogado')!);
    this.tipoUsuario = user?.tipo || 'Professor';
  }

  openScheduling() {
    this.navCtrl.navigateForward('/cadastro-reserva');
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

  manageUsers() {
    this.navCtrl.navigateForward('/usuarios');
  }

  openSettings() {
    this.navCtrl.navigateForward('/configuracoes');
  }

  openScheduling1() {
    this.navCtrl.navigateForward('/perfil');
  }
  openConsultaGeral() {
  this.navCtrl.navigateForward('/consulta-agendamentos');
  }
  openGestaoProfessores() {
  this.navCtrl.navigateForward('/gestao-prof');
  }
  openDetalhesAgendamentos() {
  this.navCtrl.navigateForward('/visualizacao-detalhada');
  }
  openGerenciarSalas() {
  this.navCtrl.navigateForward('/consulta-salas');
  }
  viewLogs() {
    this.navCtrl.navigateForward('/ver-logs');
  }
  generateReports() {
    this.navCtrl.navigateForward('/relatorios-tecnicos');
  }
  openAprovarAgendamentos() {
  this.navCtrl.navigateForward('/aprovar-agendamentos');
  }




  async checkNotifications() {
    const modal = await this.modalCtrl.create({
      component: NotificacoesPage,
      breakpoints: [0, 0.75, 1],
      initialBreakpoint: 0.75
    });
    await modal.present();
  }
}
