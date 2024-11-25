import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  images: string[] = [
    'assets/Finanzas.jpg',
    'assets/Historia.jpg',
    'assets/Math.jpg'
  ];

  constructor(
    private alertcontroller: AlertController,
    private router: Router, 
    private menucontroller: MenuController,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    console.log('Home page cargada');
  }

  generar() {
    this.router.navigate(['/clases']);
  }

  mostrarMenu() {
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }

  justificar() {
    this.router.navigate(['/justificacion']);
  }

  // Aquí va tu función de escaneo mejorada
  scanBarcode() {
    console.log('Iniciando el escaneo...');
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Datos del código de barras:', barcodeData);
      alert(`Código escaneado: ${barcodeData.text}`);
    }).catch(err => {
      console.error('Error al escanear', err);
      alert(`Error: ${err}`);
    });
  }
}
