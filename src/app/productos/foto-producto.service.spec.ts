import { TestBed } from '@angular/core/testing';

import { FotoProductoService } from './foto-producto.service';

describe('FotoProductoService', () => {
  let service: FotoProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
