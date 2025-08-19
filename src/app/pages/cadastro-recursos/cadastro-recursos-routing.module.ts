import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroRecursosPage } from './cadastro-recursos.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroRecursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroRecursosPageRoutingModule {}
