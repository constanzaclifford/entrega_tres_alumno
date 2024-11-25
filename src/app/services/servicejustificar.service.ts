import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJustificacion, IJustificacionPost } from 'src/Interfaces/justificacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceJustificar {
  private apiUrl = `${environment.apiUrl}/justificaciones`;

  constructor(private httpclient: HttpClient) {}

  // Obtener todas las justificaciones
  getJustificaciones(): Observable<IJustificacion[]> {
    return this.httpclient.get<IJustificacion[]>(this.apiUrl);
  }

  // Obtener justificaciones por usuario
  getJustificacionesByUsuario(usuarioId: number): Observable<IJustificacion[]> {
    return this.httpclient.get<IJustificacion[]>(`${this.apiUrl}/?usuarioId=${usuarioId}`);
  }

  // Crear nueva justificación
  postJustificacion(newJustificacion: IJustificacionPost): Observable<IJustificacion> {
    return this.httpclient.post<IJustificacion>(this.apiUrl, newJustificacion);
  }

  // Método para eliminar una justificación
  deleteJustificacion(id: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateJustificacion(justificacion: IJustificacion): Observable<IJustificacion> {
    console.log('Datos enviados al servidor:', justificacion);
    return this.httpclient.put<IJustificacion>(
      `${this.apiUrl}/${justificacion.id}`,
      justificacion
    );
  }
  
}
