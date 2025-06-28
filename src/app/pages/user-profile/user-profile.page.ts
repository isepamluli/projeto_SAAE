import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})
export class UserProfilePage implements OnInit {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private toastCtrl = inject(ToastController);

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['João da Silva', Validators.required],
      telefone: ['(22) 99999-9999', Validators.required],
      senhaAtual: [''],
      novaSenha: ['']
    });
  }

  async salvar() {
    const toast = await this.toastCtrl.create({
      message: 'Alterações salvas (modo offline)',
      duration: 2000,
      color: 'success'
    });
    toast.present();

    console.log('Dados salvos localmente:', this.form.value);
  }
}
