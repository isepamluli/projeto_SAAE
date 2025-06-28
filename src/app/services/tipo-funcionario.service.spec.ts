import { TestBed } from '@angular/core/testing';

import { TipoFuncionarioService } from './tipo-funcionario.service';

describe('TipoFuncionarioService', () => {
  let service: TipoFuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFuncionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
