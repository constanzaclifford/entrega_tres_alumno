import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-clase',
  templateUrl: './mi-clase.page.html',
  styleUrls: ['./mi-clase.page.scss'],
})
export class MiClasePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  // Método para manejar la navegación
  iralista(){
    this.router.navigate(['/listas']);
  }
}
