import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestao-prof',
  template: `
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Gestão de Professores</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-card>
    <ion-card-header>
      <ion-card-title>Lista de Professores</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-list>
        <ion-item *ngFor="let prof of professores">
          <ion-label>
            <h2>{{ prof.nome }}</h2>
            <p>{{ prof.email }}</p>
            <p>Status:
              <strong [ngClass]="{ 'ativo': prof.ativo, 'inativo': !prof.ativo }">
                {{ prof.ativo ? 'Ativo' : 'Inativo' }}
              </strong>
            </p>
          </ion-label>
          <ion-button fill="outline" color="success" (click)="ativarDesativar(prof)">
            {{ prof.ativo ? 'Desativar' : 'Ativar' }}
          </ion-button>
          <ion-button fill="clear" (click)="editarProfessor(prof)">
            Editar
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>

  <ion-button expand="block" color="primary" (click)="abrirModalCadastro()">
    + Adicionar Novo Professor
  </ion-button>
</ion-content>
  `,
  styleUrls: ['./gestao-prof.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class GestaoProfPage {
  professores = [
    { nome: 'Ana Paula', email: 'ana.paula@if.edu.br', ativo: true },
    { nome: 'Carlos Henrique', email: 'carlos.henrique@if.edu.br', ativo: false },
    { nome: 'Fernanda Souza', email: 'fernanda.souza@if.edu.br', ativo: true },
  ];

  constructor(private modalCtrl: ModalController) {}

  ativarDesativar(professor: any) {
    professor.ativo = !professor.ativo;
  }

  editarProfessor(professor: any) {
    console.log('Editar:', professor);
  }

  async abrirModalCadastro() {
    const modal = await this.modalCtrl.create({
      component: CadastroProfessorModal,
      cssClass: 'modal-cadastro-professor',
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.professores.push(res.data);
      }
    });

    await modal.present();
  }
}

@Component({
  selector: 'app-cadastro-professor-modal',
  template: `
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Novo Professor</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="fechar()">Fechar</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <form [formGroup]="form" (ngSubmit)="salvar()">
    <ion-item>
      <ion-label position="floating">Nome</ion-label>
      <ion-input formControlName="nome"></ion-input>
    </ion-item>
    <ion-text color="danger" *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched">
      Nome é obrigatório
    </ion-text>

    <ion-item>
      <ion-label position="floating">E-mail</ion-label>
      <ion-input formControlName="email" type="email"></ion-input>
    </ion-item>
    <ion-text color="danger" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
      E-mail válido é obrigatório
    </ion-text>

    <ion-item>
      <ion-label position="floating">Senha</ion-label>
      <ion-input [type]="mostrarSenha ? 'text' : 'password'" formControlName="senha"></ion-input>
      <ion-button fill="clear" slot="end" size="small" (click)="mostrarSenha = !mostrarSenha" type="button">
        <ion-icon [name]="mostrarSenha ? 'eye-off' : 'eye'" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-item>
    <ion-text color="danger" *ngIf="form.get('senha')?.invalid && form.get('senha')?.touched">
      Senha é obrigatória (mínimo 6 caracteres)
    </ion-text>

    <ion-button expand="block" type="submit" [disabled]="form.invalid">Salvar</ion-button>
  </form>
</ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class CadastroProfessorModal {
  form: FormGroup;
  mostrarSenha = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    if (this.form.valid) {
      const novoProfessor = {
        ...this.form.value,
        ativo: true
      };
      this.modalCtrl.dismiss(novoProfessor);
    }
  }
}
