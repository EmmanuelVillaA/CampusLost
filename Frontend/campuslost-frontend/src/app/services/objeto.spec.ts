import { TestBed } from '@angular/core/testing';

import { ObjetoService } from './objeto';

describe('Objeto', () => {
  let service: ObjetoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
