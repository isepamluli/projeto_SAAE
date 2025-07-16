import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-reserva-data',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './cadastro-reserva-data.page.html',
  styleUrls: ['./cadastro-reserva-data.page.scss'],
})
export class CadastroReservaDataPage {
  ambiente: any;
  dataSelecionada: string | null = null;
  horarios = [
    { inicio: '08:00', fim: '09:00' },
    { inicio: '09:00', fim: '10:00' },
    { inicio: '10:00', fim: '11:00' },
    { inicio: '11:00', fim: '12:00' }
  ];
  horarioSelecionado: any = null;

  constructor(private router: Router, private alertCtrl: AlertController) {
    const nav = this.router.getCurrentNavigation();
    this.ambiente = nav?.extras.state?.['ambienteSelecionado'];
  }

  checkNotifications() {}

  abrirHorarios() {}

  selecionarHorario(h: any) {
    this.horarioSelecionado = h;
  }

  async salvarDisponibilidade() {
    if (!this.dataSelecionada || !this.horarioSelecionado) return;
    const alert = await this.alertCtrl.create({
      header: 'Confirmado',
      message: `Ambiente "${this.ambiente.nome}" agendado para ${this.dataSelecionada} das ${this.horarioSelecionado.inicio} às ${this.horarioSelecionado.fim}.`,
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigateByUrl('/dashboard');
  }
}
