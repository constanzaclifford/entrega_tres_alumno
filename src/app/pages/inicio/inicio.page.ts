import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
    images: string[] = [
      'assets/Finanzas.jpg',
      'assets/quality_assurance.jpg',
      'assets/Finanzas.jpg'
    ];
  constructor() { }

  ngOnInit() {
  }



}
