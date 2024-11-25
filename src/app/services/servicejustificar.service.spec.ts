import { TestBed } from '@angular/core/testing';

import { ServicejustificarService } from './servicejustificar.service';

describe('ServicejustificarService', () => {
  let service: ServicejustificarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicejustificarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
