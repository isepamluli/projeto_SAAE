import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-agendamentos',
  templateUrl: './consulta-agendamentos.page.html',
  styleUrls: ['./consulta-agendamentos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ConsultaAgendamentosPage {

  agendamentos = [
    { id: 1, data: '2025-06-01', horaInicio: '08:00', horaFim: '08:50', sala: 'Auditório', status: 'Ativo' },
    { id: 2, data: '2025-06-02', horaInicio: '10:00', horaFim: '10:50', sala: 'Lab. Informática 1', status: 'Cancelado' },
    { id: 3, data: '2025-06-02', horaInicio: '14:00', horaFim: '14:50', sala: 'Sala de Vídeo', status: 'Ativo' }
  ];

  agendamentosFiltrados = [...this.agendamentos];

  filtroStatus: string = '';
  filtroData: string = '';

  constructor(private alertController: AlertController, private toastController: ToastController) {}

  filtrarAgendamentos() {
    this.agendamentosFiltrados = this.agendamentos.filter(agendamento => {
      const statusOk = this.filtroStatus ? agendamento.status === this.filtroStatus : true;
      const dataOk = this.filtroData ? agendamento.data === this.filtroData : true;
      return statusOk && dataOk;
    });
  }

  async verDetalhes(agendamento: any) {
    const alert = await this.alertController.create({
      header: 'Detalhes',
      message: `
        <strong>Sala:</strong> ${agendamento.sala}<br>
        <strong>Data:</strong> ${agendamento.data}<br>
        <strong>Horário:</strong> ${agendamento.horaInicio} - ${agendamento.horaFim}<br>
        <strong>Status:</strong> ${agendamento.status}
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  async cancelarAgendamento(agendamento: any) {
    const alert = await this.alertController.create({
      header: 'Cancelar Agendamento',
      message: 'Tem certeza que deseja cancelar este agendamento?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: async () => {
            agendamento.status = 'Cancelado';
            this.filtrarAgendamentos();
            const toast = await this.toastController.create({
              message: 'Agendamento cancelado com sucesso!',
              duration: 2000,
              color: 'success',
              position: 'top'
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }
}
