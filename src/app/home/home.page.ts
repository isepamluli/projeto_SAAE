import { Component, OnInit } from '@angular/core';
import { AgendamentoService, Agendamento } from '../services/agendamento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  agendamentos: Agendamento[] = [];

  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit() {
    this.agendamentoService.listarAgendamentos().subscribe(data => {
      this.agendamentos = data;
    }, error => {
      console.error('Erro ao carregar agendamentos', error);
    });
  }
}
