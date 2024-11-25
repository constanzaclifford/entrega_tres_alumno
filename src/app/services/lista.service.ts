import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para realizar peticiones HTTP
import { Observable } from 'rxjs'; // Para manejar las respuestas asíncronas
import { map } from 'rxjs/operators'; // Importa el operador 'map' para transformar la respuesta
import { Lista } from 'src/Interfaces/lista'; // La interfaz Lista
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private apiUrl = `${environment.apiUrl}/lista`;

  constructor(private http: HttpClient) { }

  // Obtener la lista completa de estudiantes
  getListas(): Observable<Lista[]> {
    return this.http.get<Lista[]>(this.apiUrl);
  }

  // Agregar un nuevo estudiante a la lista
  addUsuario(nuevoUsuario: Lista): Observable<Lista> {
    return this.http.post<Lista>(this.apiUrl, nuevoUsuario); // Realiza una petición POST para agregar un nuevo estudiante
  }

  // Actualizar la asistencia de un estudiante
  updateAsistencia(id: number, asistencia: boolean): Observable<Lista> {
    return this.http.put<Lista>(`${this.apiUrl}/${id}`, { asistencia }); // Realiza una petición PUT para actualizar la asistencia
  }

  // Eliminar un estudiante de la lista
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Realiza una petición DELETE para eliminar un estudiante
  }
}
