import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-cadastro-recursos',
  templateUrl: './cadastro-recursos.page.html',
  styleUrls: ['./cadastro-recursos.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CadastroRecursosPage implements OnInit {
  loading = false;

  // Lista de salas mockadas
  salas = [
    { id: 1, nome: 'Sala 101' },
    { id: 2, nome: 'Sala 102' },
    { id: 3, nome: 'Laboratório de Informática' },
    { id: 4, nome: 'Auditório' },
  ];

  // Modelo do recurso
  recurso = {
    nome: '',
    sala_id: 0
  };

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async cadastrarRecurso() {
    const loading = await this.loadingCtrl.create({ message: 'Salvando recurso...' });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      console.log('Recurso cadastrado (mock):', this.recurso);

      const toast = await this.toastCtrl.create({
        message: `Recurso "${this.recurso.nome}" cadastrado para a sala ID ${this.recurso.sala_id}`,
        duration: 2500,
        color: 'success'
      });
      toast.present();

      // limpa o formulário
      this.recurso = { nome: '', sala_id: 0 };
    }, 1200);
  }
}
