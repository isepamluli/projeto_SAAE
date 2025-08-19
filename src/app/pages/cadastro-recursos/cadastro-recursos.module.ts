import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CadastroRecursosPageRoutingModule } from './cadastro-recursos-routing.module';
import { CadastroRecursosPage } from './cadastro-recursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroRecursosPageRoutingModule
  ],
  declarations: [CadastroRecursosPage]
})
export class CadastroRecursosPageModule {}
