import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Agendamento {
  id: number;
  solicitante: string;
  sala: string;
  data: string;
  horario: string;
  status: 'pendente' | 'aprovado' | 'recusado';
}

@Component({
  selector: 'app-aprovar-agendamentos',
  templateUrl: './aprovar-agendamentos.page.html',
  styleUrls: ['./aprovar-agendamentos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AprovarAgendamentosPage implements OnInit {
  agendamentos: Agendamento[] = [];

  constructor(private toastCtrl: ToastController) {}

  ngOnInit() {
    // Dados simulados (pode vir de API)
    this.agendamentos = [
      { id: 1, solicitante: 'Ana Paula', sala: 'Sala 101', data: '2025-07-20', horario: '08:00 - 09:30', status: 'pendente' },
      { id: 2, solicitante: 'João Silva', sala: 'Auditório', data: '2025-07-21', horario: '10:00 - 12:00', status: 'pendente' },
      { id: 3, solicitante: 'Maria Lima', sala: 'Laboratório 3', data: '2025-07-22', horario: '14:00 - 15:30', status: 'pendente' },
    ];
  }

  async aprovar(id: number) {
    this.alterarStatus(id, 'aprovado');
    const toast = await this.toastCtrl.create({ message: 'Agendamento aprovado!', duration: 2000, color: 'success' });
    await toast.present();
  }

  async recusar(id: number) {
    this.alterarStatus(id, 'recusado');
    const toast = await this.toastCtrl.create({ message: 'Agendamento recusado!', duration: 2000, color: 'danger' });
    await toast.present();
  }

  alterarStatus(id: number, novoStatus: 'aprovado' | 'recusado') {
    const index = this.agendamentos.findIndex(a => a.id === id);
    if (index > -1) {
      this.agendamentos[index].status = novoStatus;
    }
  }
}
