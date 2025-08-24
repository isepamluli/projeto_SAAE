import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) {}

  // ============================
  // Usuários
  // ============================
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
  }

  createUsuario(usuario: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/usuarios`, usuario);
  }


  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/usuarios/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/usuarios/${id}`);
  }

  // ============================
  // Salas
  // ============================
  getSalas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/salas`);
  }

  // ============================
  // Agendamentos
  // ============================
  getAgendamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/agendamentos`);
  }

  createAgendamento(agendamento: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/agendamentos`, agendamento);
  }

  // ============================
  // Disponibilidades
  // ============================
  getDisponibilidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/disponibilidades`);
  }

  createDisponibilidade(disponibilidade: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disponibilidades`, disponibilidade);
  }
}
