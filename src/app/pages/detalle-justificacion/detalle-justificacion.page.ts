import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IJustificacion } from 'src/Interfaces/justificacion';
import { ServiceJustificar } from 'src/app/services/servicejustificar.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-justificacion',
  templateUrl: './detalle-justificacion.page.html',
  styleUrls: ['./detalle-justificacion.page.scss'],
})
export class DetalleJustificacionPage implements OnInit {
  justificacion: IJustificacion = {
    id: 0,
    motivo: '',
    descripcion: '',
    usuarioId: 0,
    comentario: '', // Inicializado para evitar problemas
  };

  comentarioGuardado = false; // Bandera para deshabilitar el campo de comentarios

  constructor(
    private activaterouter: ActivatedRoute,
    private router: Router,
    private justificacionService: ServiceJustificar,
    private alertController: AlertController
  ) {
    this.activaterouter.queryParams.subscribe(param => {
      const parsedData = JSON.parse(param['justificacion'] || '{}');
      this.justificacion = { ...this.justificacion, ...parsedData };
    });
  }

  ngOnInit() {}

  regresar() {
    this.router.navigate(['/justificacion']);
  }

  async eliminarJustificacion() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar esta justificación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.justificacionService.deleteJustificacion(this.justificacion.id).subscribe(
              async () => {
                const successAlert = await this.alertController.create({
                  header: 'Éxito',
                  message: 'Justificación eliminada correctamente.',
                  buttons: ['Aceptar'],
                });
                await successAlert.present();
                this.regresar();
              },
              error => {
                this.mostrarError('No se pudo eliminar la justificación. Intente nuevamente.');
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  async guardarComentario() {
    if (!this.justificacion.comentario || this.justificacion.comentario.trim() === '') {
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'El comentario no puede estar vacío.',
        buttons: ['Aceptar'],
      });
      await errorAlert.present();
      return;
    }
  
    console.log('Enviando justificación:', this.justificacion);
  
    this.justificacionService.updateJustificacion(this.justificacion).subscribe(
      async (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'Comentario guardado correctamente.',
          buttons: ['Aceptar'],
        });
        await successAlert.present();
  
        this.comentarioGuardado = true;
        this.regresar();
      },
      async (error) => {
        console.error('Error al guardar:', error);
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo guardar el comentario. Intente nuevamente.',
          buttons: ['Aceptar'],
        });
        await errorAlert.present();
      }
    );
  }
  
  
  

  mostrarError(mensaje: string) {
    alert(mensaje);
  }
}
