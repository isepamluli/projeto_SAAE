import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://192.168.1.249:3000';

  constructor(private http: HttpClient) {}

  // Usuários
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario);
  }

  // Salas
  getSalas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/salas`);
  }

  // Agendamentos
  getAgendamentos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agendamentos`);
  }

  createAgendamento(agendamento: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/agendamentos`, agendamento);
  }
}
