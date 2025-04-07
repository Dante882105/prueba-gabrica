import { TestBed } from '@angular/core/testing';

import { GuardarDatosService } from './guardar-datos.service';

describe('GuardarDatosService', () => {
  let service: GuardarDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
