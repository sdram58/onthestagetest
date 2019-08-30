import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Globales } from './Globales';
import { Observable } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class TiposEventoService {

  urlTipoEventoGenero:string;
  urlTipoEventoMusica:string;

  constructor(private http:HttpClient, private GLOBALES:Globales) { 
    this.urlTipoEventoGenero = GLOBALES.URL_API + 'tipoeventogenero';
    this.urlTipoEventoMusica = GLOBALES.URL_API + 'tipoeventomusica';
  }

  public getGeneros():Observable<any>{
    return this.http.get(this.urlTipoEventoGenero);
  }

  public getMusica():Observable<any>{
    return this.http.get(this.urlTipoEventoMusica);
  }
 
}
