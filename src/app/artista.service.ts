import { Injectable } from '@angular/core';
import { Globales, RespuestaDatos } from './Globales';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { Artista } from './modelo/Artista';
import { Localidad } from './modelo/Localidad';
import { TipoEvento } from './modelo/TipoEvento';
import { StorageService } from './storage.service';
import { ArtistaMin } from './modelo/ArtistaMin';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  urlGetDatosArtista:string ="";
  urlGetAllMin:string="";
  urlDeleteNoRegById:string ="";
  urlArtistaId:string = "";
  constructor(private http: HttpClient, private GLOBALES:Globales, private ss:StorageService) {
    this.urlGetDatosArtista = this.GLOBALES.URL_API + 'artista/datos';
    this.urlGetAllMin = this.GLOBALES.URL_API + 'artista/allmin';
    this.urlDeleteNoRegById = this.GLOBALES.URL_API + 'artistanoreg/';
    this.urlArtistaId = this.GLOBALES.URL_API + 'artista/';
   }

  getDatos(token?:string):Observable<string>{
    const headers = new HttpHeaders()
    .set("Authorization", ((token)?token:this.GLOBALES.TOKEN));
    return new Observable((observer)=>{
      this.http.get(this.urlGetDatosArtista, {headers}).subscribe(
        res => {
          if(res['STATUS']=="OK"){
            let usuario = new Artista();
            for(let key in usuario){
              usuario[key] = res['DATA'][0][key];
            }
            /* usuario.id = res['DATA'][0]['id'];
            usuario.apellidos = res['DATA'][0]['apellidos'];
            usuario.email = res['DATA'][0]['email'];
            usuario.nombre = res['DATA'][0]['nombre'];
            usuario.nartista = res['DATA'][0]['nartista'];
            usuario.fotoperfil = res['DATA'][0]['fotoperfil'];
            usuario.foto1 = res['DATA'][0]['foto1'];
            usuario.foto2 = res['DATA'][0]['foto2'];
            usuario.foto3 = res['DATA'][0]['foto3'];
            usuario.foto4 = res['DATA'][0]['foto4'];
            usuario.foto5 = res['DATA'][0]['foto5'];
            usuario.foto6 = res['DATA'][0]['foto6'];
            usuario.tipo_espectaculo = res['DATA'][0]['tipo_espectaculo'];
            usuario.localidad = res['DATA'][0]['localidad'];
            usuario.desc_espectaculo = res['DATA'][0]['desc_espectaculo'];            
            usuario.premium = res['DATA'][0]['foto6'];
            usuario.destacado = res['DATA'][0]['destacado'];
            usuario.recursos = res['DATA'][0]['recursos'];
            usuario.cache = res['DATA'][0]['cache'];
            usuario.video = res['DATA'][0]['video'];
            usuario.pweb = res['DATA'][0]['pweb'];
            usuario.instagram = res['DATA'][0]['instagram'];
            usuario.twitter = res['DATA'][0]['twitter'];
            usuario.facebook = res['DATA'][0]['facebook'];
            usuario.integrantes = res['DATA'][0]['integrantes'];  */
            
            this.GLOBALES.USUARIO = usuario;
            this.ss.saveUsuario();

            observer.next('OK');
          }else{
            observer.next('KO');
          }
          observer.complete();
        },
        err =>{
          observer.next('KO');
          observer.complete();          
          console.log(err);
        }
      )
    });
    
  }

  getArtistasMin():Observable<ArtistaMin[]>{
    const headers = new HttpHeaders()
    .set("Authorization", this.GLOBALES.TOKEN);
    return new Observable((observer)=>{
      this.http.get(this.urlGetAllMin, {headers}).subscribe(
        res => {
          if(res['STATUS']=="OK"){
            let usuarios:ArtistaMin[] = new Array();
            for(let i = 0; i< res['DATA'].length;i++){
              let usuario = new ArtistaMin();
              for(let key in usuario){
                usuario[key] = res['DATA'][i][key];
              }

              /* usuario.id = res['DATA'][i]['id'];
              usuario.nartista = res['DATA'][i]['nartista'];
              usuario.fotoperfil = res['DATA'][i]['fotoperfil'];
              usuario.desc_espectaculo = res['DATA'][i]['desc_espectaculo'];
              usuario.localidad = res['DATA'][i]['localidad']; */
              usuarios.push(usuario);
            }
            observer.next(usuarios);
          }else{
            observer.next(null);
          }
          observer.complete();
        },
        err =>{
          observer.next(null);
          observer.complete();          
          console.log(err);
        }
      )
    });
  }

  deleteNoRegById(id:number):Observable<string>{
    const headers = new HttpHeaders()
    .set("Authorization", this.GLOBALES.TOKEN);
    return new Observable((observer)=>{
      this.http.delete(this.urlDeleteNoRegById + id, {headers}).subscribe(
        res => {
          if(res['STATUS']=="OK"){                      
            observer.next("OK");
          }
          if(res['STATUS']=="KO"){
            observer.next(res['DATA']);
          }
          observer.complete();
        },
        err =>{
          observer.next(null);
          observer.complete();          
          console.log(err);
        }
      )
    });
  }

  getArtistaById(id:number):Observable<RespuestaDatos>{
    return new Observable((observer)=>{
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
      this.http.get(this.urlArtistaId + id, {headers}).subscribe(
        (res) =>{ 
          console.log(res)
          let mRes:RespuestaDatos = new RespuestaDatos();

          if(res['STATUS'] && res['STATUS']=='OK'){
            mRes.res = true;
            mRes.data = res['DATA'];
            observer.next(mRes);
          }else if(res['STATUS'] && res['STATUS']=='KO'){
            mRes.res = false;
            mRes.data = [res['error']];
            observer.next(mRes);
          }
          observer.complete();
        },
        (err) =>{
          console.log(err);
          observer.next(null);
          observer.complete();
        });
    });
  }
}
