import { Component, OnInit } from '@angular/core';
import { ServiceJustificar } from 'src/app/services/servicejustificar.service';
import { IJustificacion, IJustificacionPost } from 'src/Interfaces/justificacion';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-justificacion',
  templateUrl: './justificacion.page.html',
  styleUrls: ['./justificacion.page.scss'],
})
export class JustificacionPage implements OnInit {
  justificaciones: IJustificacion[] = [];
  nuevaJustificacion: IJustificacionPost = {
    motivo: '',
    descripcion: '',
    fecha: '',
    archivo: '',
    usuarioId: this.justificaciondeusuario(),
  };

  constructor(
    private justificacionService: ServiceJustificar,
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.cargarJustificaciones();
  }

  cargarJustificaciones() {
    const usuarioId = this.justificaciondeusuario();
    this.justificacionService.getJustificacionesByUsuario(usuarioId).subscribe(justificaciones => {
      this.justificaciones = justificaciones;
    });
  }

  // Añadir un método para manejar el evento de regreso
  handleRefresh() {
    this.cargarJustificaciones();
  }
  enviarJustificacion() {
    if (this.nuevaJustificacion.motivo.length < 5 || this.nuevaJustificacion.descripcion.length < 5) {
      alert('Los campos motivo y descripción deben tener al menos 5 caracteres.');
      return;
    }
  
    const nuevaJustificacion: IJustificacionPost = {
      motivo: this.nuevaJustificacion.motivo,
      descripcion: this.nuevaJustificacion.descripcion,
      fecha: new Date().toISOString(),
      archivo: this.nuevaJustificacion.archivo,
      usuarioId: this.justificaciondeusuario(),
    };
  
    this.justificacionService.postJustificacion(nuevaJustificacion).subscribe(
      response => {
        console.log('Justificación enviada:', response);
        this.justificaciones.push(response);
        this.resetForm();
      },
      error => {
        console.error('Error al enviar justificación:', error);
        alert('Ocurrió un error al enviar la justificación. Por favor, verifica los datos.');
      }
    );
  }
  

  resetForm() {
    this.nuevaJustificacion = { motivo: '', descripcion: '', fecha: '', archivo: '', usuarioId: this.justificaciondeusuario() }; // Reiniciar el formulario
  }

  buscarJustificacion(justificacion: IJustificacion) {
    this.router.navigate(['/detalle-justificacion'], {
      queryParams: { justificacion: JSON.stringify(justificacion) }
    });
  }

  regresar() {
    this.router.navigate(['/inicio'])
  }

  justificaciondeusuario(): number {
    const usuarioLogueado = JSON.parse(localStorage.getItem('user') || '{}'); // Obtener el usuario logueado desde localStorage
    return usuarioLogueado.id || 0; // Devuelve el ID del usuario logueado, o 0 si no está logueado
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.nuevaJustificacion.archivo = file.name; // Guarda el nombre del archivo en la propiedad correspondiente
      // Si necesitas manejar el archivo en sí (como cargarlo en un servidor), puedes hacerlo aquí
    }
  }
}
