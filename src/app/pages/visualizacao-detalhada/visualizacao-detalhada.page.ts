import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizacao-detalhada',
  templateUrl: './visualizacao-detalhada.page.html',
  styleUrls: ['./visualizacao-detalhada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class VisualizacaoDetalhadaPage {
    constructor(private navCtrl: NavController) {}

  voltar() {
    this.navCtrl.back();
  }
  reservas = [
    {
      solicitante: 'João da Silva',
      sala: 'Laboratório de Informática 1',
      data: '22/07/2025',
      horario: '14:00 - 16:00'
    },
    {
      solicitante: 'Maria Oliveira',
      sala: 'Sala de Vídeo 2',
      data: '24/07/2025',
      horario: '08:00 - 10:00'
    },
    {
      solicitante: 'Carlos Souza',
      sala: 'Auditório',
      data: '25/07/2025',
      horario: '10:30 - 12:00'
    },
    {
      solicitante: 'Fernanda Lima',
      sala: 'Laboratório de Ciências',
      data: '26/07/2025',
      horario: '13:00 - 15:00'
    },
    {
      solicitante: 'Roberta Nunes',
      sala: 'Sala de Vídeo 3',
      data: '29/07/2025',
      horario: '09:00 - 11:00'
    }
  ];
}
