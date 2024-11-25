import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePerfilPage } from './detalle-perfil.page';

describe('DetallePerfilPage', () => {
  let component: DetallePerfilPage;
  let fixture: ComponentFixture<DetallePerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
