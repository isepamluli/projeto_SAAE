import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cancelar-agendamento',
  templateUrl: './cancelar-agendamento.page.html',
  styleUrls: ['./cancelar-agendamento.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CancelarAgendamentoPage {
  agendamentos = [
    {
      id: 1,
      titulo: 'Aula',
      sala: 'Laboratório de Informática 1',
      data: '2025-06-10',
      hora: '14:00',
    },
    {
      id: 2,
      titulo: 'Aula ',
      sala: 'Sala de vídeo 3',
      data: '2025-06-12',
      hora: '09:00',
    },
    {
      id: 3,
      titulo: 'Aula',
      sala: 'Sala de vídeo 1',
      data: '2025-06-10',
      hora: '14:00',
    },
  ];

  constructor(private navCtrl: NavController) {}

  cancelarAgendamento(id: number) {
    this.agendamentos = this.agendamentos.filter(a => a.id !== id);
  }

  voltarDashboard() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
