import { Component, OnInit } from '@angular/core';
import { ClasesService } from 'src/app/services/clases.service';
import { IClases } from 'src/Interfaces/clases';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  clases: IClases[]=[];

  constructor(private claseservice:ClasesService, private router:Router) { }

  ngOnInit(): void {

    this.claseservice.getUsuarios().subscribe(data=>{this.clases=data;})
  }

 
  regresar(){
    this.router.navigate(['/inicio'])
  }


  buscarClase(Observable:any){
    this.router.navigate(['/detalle-clases'],
      {queryParams: {clases:JSON.stringify(Observable)}}
    )
  }

}
