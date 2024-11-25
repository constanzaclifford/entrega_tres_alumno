import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IClases } from 'src/Interfaces/clases'; // Asegúrate de tener esta interfaz
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-clases',
  templateUrl: './detalle-clases.page.html',
  styleUrls: ['./detalle-clases.page.scss'],
})
export class DetalleClasesPage implements OnInit {

  clase: any;
  qrdata: string = ''; // Variable para el QR

  constructor(private activaterouter: ActivatedRoute, private router: Router) { 
    this.activaterouter.queryParams.subscribe(param => {
      this.clase = JSON.parse(param['clases']);
    });
  }

  ngOnInit() {}

  regresar() {
    this.router.navigate(['/clases']); 
  }

  generarQr() {
    // Genera el contenido del QR aquí
    this.qrdata = `${this.clase.nombre} - ${this.clase.asignatura}`; 
    console.log(this.qrdata);
  }
}
