import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cancelar-agendamento',
  templateUrl: './cancelar-agendamento.page.html',
  styleUrls: ['./cancelar-agendamento.page.scss'],
  standalone: true,
  imports: []
})
export class CancelarAgendamentoPage {
  agendamentos = [
    {
      id: 1,
      titulo: 'Reunião da Equipe',
      sala: 'Sala 01',
      data: '2025-06-10',
      hora: '14:00',
    },
    {
      id: 2,
      titulo: 'Oficina de Robótica',
      sala: 'Sala 03',
      data: '2025-06-12',
      hora: '09:00',
    }
  ];

  constructor(private navCtrl: NavController) {}

  cancelarAgendamento(id: number) {
    this.agendamentos = this.agendamentos.filter(a => a.id !== id);
  }

  voltarDashboard() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
