import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';

// Importações para exportação
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-consulta-salas',
  templateUrl: './consulta-salas.page.html',
  styleUrls: ['./consulta-salas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ConsultaSalasPage {

  salas = [
    { id: 1, nome: 'Auditório', descricao: 'Espaço para eventos', numero: 101, capacidade: 150, tipo: 'Auditório' },
    { id: 2, nome: 'Laboratório de Informática 1', descricao: 'Lab com computadores', numero: 202, capacidade: 30, tipo: 'Laboratório' },
    { id: 3, nome: 'Sala de Vídeo', descricao: 'Sala para apresentações', numero: 303, capacidade: 40, tipo: 'Sala de Vídeo' }
  ];

  constructor(private alertController: AlertController, private toastController: ToastController) {}

  async verDetalhes(sala: any) {
    const alert = await this.alertController.create({
      header: 'Detalhes da Sala',
      message: `
        <strong>Nome:</strong> ${sala.nome}<br>
        <strong>Descrição:</strong> ${sala.descricao}<br>
        <strong>Número:</strong> ${sala.numero}<br>
        <strong>Capacidade:</strong> ${sala.capacidade}<br>
        <strong>Tipo:</strong> ${sala.tipo}
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  async editarSala(sala: any) {
    const alert = await this.alertController.create({
      header: 'Editar Sala',
      inputs: [
        { name: 'nome', type: 'text', placeholder: 'Nome', value: sala.nome },
        { name: 'descricao', type: 'text', placeholder: 'Descrição', value: sala.descricao },
        { name: 'numero', type: 'number', placeholder: 'Número', value: sala.numero },
        { name: 'capacidade', type: 'number', placeholder: 'Capacidade', value: sala.capacidade },
        { name: 'tipo', type: 'text', placeholder: 'Tipo', value: sala.tipo }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: async (data) => {
            sala.nome = data.nome;
            sala.descricao = data.descricao;
            sala.numero = data.numero;
            sala.capacidade = data.capacidade;
            sala.tipo = data.tipo;

            const toast = await this.toastController.create({
              message: 'Sala atualizada com sucesso!',
              duration: 2000,
              color: 'success'
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  async excluirSala(sala: any) {
    const alert = await this.alertController.create({
      header: 'Excluir Sala',
      message: `Tem certeza que deseja excluir a sala "${sala.nome}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: async () => {
            this.salas = this.salas.filter(s => s.id !== sala.id);
            const toast = await this.toastController.create({
              message: 'Sala excluída com sucesso!',
              duration: 2000,
              color: 'danger'
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  exportarParaExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.salas);
    const workbook = { Sheets: { 'Salas': worksheet }, SheetNames: ['Salas'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.salvarArquivo(excelBuffer, 'salas.xlsx', 'application/octet-stream');
  }

  exportarParaPDF() {
    const doc = new jsPDF();

    const colunas = ['Nome', 'Descrição', 'Número', 'Capacidade', 'Tipo'];
    const linhas = this.salas.map(s => [
      s.nome,
      s.descricao,
      s.numero,
      s.capacidade,
      s.tipo
    ]);

    autoTable(doc, {
      head: [colunas],
      body: linhas
    });

    doc.save('salas.pdf');
  }

  salvarArquivo(buffer: any, fileName: string, fileType: string) {
    const data: Blob = new Blob([buffer], { type: fileType });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = fileName;
    link.click();
  }
}
