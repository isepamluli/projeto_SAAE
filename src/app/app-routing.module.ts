import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // 🔐 Autenticação
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./pages/recuperar-senha/recuperar-senha.page').then(m => m.RecuperarSenhaPage),
  },

  // 🏠 Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
  },

  // 📋 Cadastros
  {
    path: 'cadastro-funcionario',
    loadComponent: () =>
      import('./pages/cadastro-funcionario/cadastro-funcionario.page').then(m => m.CadastroFuncionarioPage),
  },
  {
    path: 'cadastro-sala',
    loadComponent: () =>
      import('./pages/cadastro-sala/cadastro-sala.page').then(m => m.CadastroSalaPage),
  },
  {
    path: 'cadastro-agenda',
    loadComponent: () =>
      import('./pages/cadastro-agenda/cadastro-agenda.page').then(m => m.CadastroAgendaPage),
  },
  {
    path: 'cadastro-disponibilidade',
    loadComponent: () =>
      import('./pages/cadastro-disponibilidade/cadastro-disponibilidade.page').then(m => m.CadastroDisponibilidadePage),
  },
  {
    path: 'cadastro-tipo-funcionario',
    loadComponent: () =>
      import('./pages/cadastro-tipo-funcionario/cadastro-tipo-funcionario.page').then(m => m.CadastroTipoFuncionarioPage),
  },
  {
    path: 'cadastro-tipo-sala',
    loadComponent: () =>
      import('./pages/cadastro-tipo-sala/cadastro-tipo-sala.page').then(m => m.CadastroTipoSalaPage),
  },

  // 🔎 Consultas
  {
    path: 'consulta-agendamentos',
    loadComponent: () =>
      import('./pages/consulta-agendamentos/consulta-agendamentos.page').then(m => m.ConsultaAgendamentosPage),
  },
  {
    path: 'consulta-salas',
    loadComponent: () =>
      import('./pages/consulta-salas/consulta-salas.page').then(m => m.ConsultaSalasPage),
  },
  {
    path: 'consulta-disponibilidade',
    loadComponent: () =>
      import('./pages/consulta-disponibilidade/consulta-disponibilidade.page').then(m => m.ConsultaDisponibilidadePage),
  },

  // 📁 Extras
  {
    path: 'notificacoes',
    loadComponent: () =>
      import('./pages/notificacoes/notificacoes.page').then(m => m.NotificacoesPage),
  },
  {
    path: 'relatorios',
    loadComponent: () =>
      import('./pages/relatorios/relatorios.page').then(m => m.RelatoriosPage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/user-profile/user-profile.page').then(m => m.UserProfilePage),
  },

  // 🚀 Nova rota adicionada:
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.page').then(m => m.UsuariosPage),
  },
  {
  path: 'controle-acesso',
  loadComponent: () =>
    import('./pages/controle-acesso/controle-acesso.page').then(m => m.ControleAcessoPage),
  },
  {
  path: 'minhas-reservas',
  loadComponent: () => import('./pages/minhas-reservas/minhas-reservas.page').then(m => m.MinhasReservasPage) 
  },
  



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
