import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IClases,IClase } from 'src/Interfaces/clases';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  constructor(private httpclient:HttpClient) { }


  getUsuarios():Observable<IClases[]>{
    
    return this.httpclient.get<IClases[]>(`${environment.apiUrl}/clases`)
  }

  postUsuarios(newClases:IClase):Observable<IClase>{

    return this.httpclient.post<IClase>(`${environment.apiUrl}/usuarios`, newClases);
  }

  putUsuarios(clases:any):Observable<IClases>{
    return this.httpclient.put<IClases>(`${environment.apiUrl}/mascotas/${clases.id}`, clases);
    
    }


}
