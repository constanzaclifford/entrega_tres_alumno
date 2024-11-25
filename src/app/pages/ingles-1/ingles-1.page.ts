import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingles-1',
  templateUrl: './ingles-1.page.html',
  styleUrls: ['./ingles-1.page.scss'],
})
export class Ingles1Page implements OnInit {

  constructor(private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
  }

  async cerrarAsistencia() {
    
    const alert = await this.alertController.create({
      header: '¿Cerrar asistencia?',
      message: '¿Estás seguro de que deseas cerrar la asistencia?',
      mode:"ios",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de asistencia cancelado');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Cierre de asistencia confirmado');
          },
        },
      ],
    });
  
    await alert.present();
    }
  

  escanear() {
    console.log('Escanear click');
  }
}
