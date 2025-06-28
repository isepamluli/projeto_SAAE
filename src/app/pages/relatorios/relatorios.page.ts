import { Component } from '@angular/core';
import { ToastController, AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RelatoriosPage {
  dataInicio = '';
  dataFim = '';
  salaSelecionada = '';
  salas = ['Auditório', 'Sala de Vídeo', 'Laboratório de Informática', 'Laboratório de Química'];

  agendamentos = [
    { data: '2024-07-06', sala: 'Auditório', evento: 'Semana Tecnológica', funcionario: 'Érika' },
    { data: '2024-07-03', sala: 'Auditório', evento: 'Palestras', funcionario: 'Joélio' },
    { data: '2024-07-04', sala: 'Sala de Vídeo', evento: 'Apresentação de Trabalhos', funcionario: 'Joélio' },
    { data: '2024-06-21', sala: 'Laboratório de Química', evento: 'Atividade Prática', funcionario: 'Alexandre' }
  ];

  agendamentosFiltrados = [...this.agendamentos];

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) {}

  gerarRelatorio() {
    this.agendamentosFiltrados = this.agendamentos.filter(item => {
      const dataOk = (!this.dataInicio || item.data >= this.dataInicio) && (!this.dataFim || item.data <= this.dataFim);
      const salaOk = this.salaSelecionada ? item.sala === this.salaSelecionada : true;
      return dataOk && salaOk;
    });

    this.toast('✅ Relatório atualizado com sucesso!');
  }

  async exportarExcel() {
    if (this.agendamentosFiltrados.length === 0) {
      return this.toast('⚠️ Nenhum dado para exportar!', 'warning');
    }

    const worksheet = XLSX.utils.json_to_sheet(this.agendamentosFiltrados);
    const workbook = { Sheets: { 'Relatório': worksheet }, SheetNames: ['Relatório'] };
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.salvarArquivo(buffer, 'relatorio.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.toast('📁 Excel exportado com sucesso!', 'success');
  }

  async exportarPDF() {
    if (this.agendamentosFiltrados.length === 0) {
      return this.toast('⚠️ Nenhum dado para exportar!', 'warning');
    }

    const doc = new jsPDF();
    const colunas = ['Data', 'Sala', 'Evento', 'Funcionário'];
    const linhas = this.agendamentosFiltrados.map(d => [d.data, d.sala, d.evento, d.funcionario]);

    autoTable(doc, { head: [colunas], body: linhas });
    doc.save('relatorio.pdf');

    this.toast('📄 PDF gerado com sucesso!', 'success');
  }

  salvarArquivo(buffer: any, fileName: string, fileType: string) {
    const blob = new Blob([buffer], { type: fileType });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  async toast(msg: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color,
      position: 'top',
      animated: true,
      icon: color === 'success' ? 'checkmark-circle-outline' : color === 'warning' ? 'alert-circle-outline' : 'information-circle-outline'
    });
    await toast.present();
  }
}
