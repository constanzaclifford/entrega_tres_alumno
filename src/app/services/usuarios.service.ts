import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUsuarios, IUsuario } from 'src/Interfaces/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private httpclient: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<IUsuarios[]> {
    return this.httpclient.get<IUsuarios[]>(`${environment.apiUrl}/usuarios`);
  }

  // Obtener usuario por nombre de usuario
  getUsuarioByUsername(username: string): Observable<IUsuarios> {
    return this.httpclient.get<IUsuarios>(`${environment.apiUrl}/usuarios/?username=${username}`);
  }

  // UsuariosService

  getUsuarioLogueadoId(): number {
    const user = localStorage.getItem('user'); // Recupera el objeto del usuario
    if (user) {
      const usuario = JSON.parse(user); // Convierte el JSON a objeto
      return usuario.id; // Retorna el ID del usuario
    }
    return 0; // Devuelve 0 si no hay usuario logueado
  }


  // UsuariosService
// Verificar si el correo ya está registrado
checkEmailExists(email: string): Observable<IUsuarios[]> {
  return this.httpclient.get<IUsuarios[]>(`${environment.apiUrl}/usuarios/?email=${email}`);
}


  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null; // Cambia a sessionStorage si es necesario
  }

  // Crear un nuevo usuario
  postUsuarios(newUsuario: IUsuario): Observable<IUsuario> {
    return this.httpclient.post<IUsuario>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<IUsuarios> {
    return this.httpclient.get<IUsuarios>(`${environment.apiUrl}/usuarios/${id}`);
  }

  // Actualizar usuario
  putUsuarios(usuario: IUsuario & { id: number }): Observable<IUsuarios> {
    // Asegúrate de que `usuario` tenga el `id` para actualizar
    return this.httpclient.put<IUsuarios>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
  }

  // Eliminar usuario
  deleteUsuario(id: number): Observable<void> {
    return this.httpclient.delete<void>(`${environment.apiUrl}/usuarios/${id}`);
  }
}
