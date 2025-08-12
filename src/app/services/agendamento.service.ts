// src/app/services/agendamento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Agendamento {
  IDA: number;
  EventoA: string;
  SegmentoA: string;
  Data: string;
  NomeF: string;
  NomeS: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://localhost/api_agendamento/listar_agendamentos.php';

  constructor(private http: HttpClient) { }

  listarAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }
}
