import { Injectable } from '@angular/core';
import { LocalMin } from './modelo/LocalMin';
import { Local } from './modelo/Local';
import { Globales, RespuestaDatos } from './Globales';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Localidad } from './modelo/Localidad';
import { TipoEvento } from './modelo/TipoEvento';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private urlAllMin:string = "";
  private urlGetDatosLocal:string = "";
  private urlDeleteNoRegById = "";
  private urlLocalId:string = "";

  constructor(private http: HttpClient, 
      private GLOBALES:Globales, 
      private ss:StorageService) {
    this.urlGetDatosLocal = this.GLOBALES.URL_API + 'local/datos';
    this.urlAllMin = this.GLOBALES.URL_API + 'local/allmin';
    this.urlDeleteNoRegById = this.GLOBALES.URL_API + 'localnoreg/';
    this.urlLocalId = this.GLOBALES.URL_API + 'local/';
  }

  getDatos(token?:string):Observable<string>{
    const headers = new HttpHeaders()
    .set("Authorization", ((token)?token:this.GLOBALES.TOKEN));
    return new Observable((observer)=>{
      this.http.get(this.urlGetDatosLocal, {headers}).subscribe(
        res => {
          if(res['STATUS']=="OK"){
            let usuario = new Local();
            for(let key in usuario){
              usuario[key] = res['DATA'][0][key];
            }
            /* usuario.id = res['DATA'][0]['id'];
            usuario.apellidos = res['DATA'][0]['apellidos'];
            usuario.email = res['DATA'][0]['email'];
            usuario.nombre = res['DATA'][0]['nombre'];
            usuario.m_pass = res['DATA'][0]['m_pass'];            
            usuario.nlocal = res['DATA'][0]['nartista'];
            usuario.fotoperfil = res['DATA'][0]['fotoperfil'];
            usuario.foto1 = res['DATA'][0]['foto1'];
            usuario.foto2 = res['DATA'][0]['foto2'];
            usuario.foto3 = res['DATA'][0]['foto3'];
            usuario.foto4 = res['DATA'][0]['foto4'];
            usuario.localidad = res['DATA'][0]['localidad'];
            usuario.direccion = res['DATA'][0]['direccion'];            
            usuario.descripcion = res['DATA'][0]['descripcion'];            
            usuario.telf = res['DATA'][0]['telf'];            
            usuario.latitud = res['DATA'][0]['latitud'];            
            usuario.longitud = res['DATA'][0]['longitud'];            
            usuario.horario = res['DATA'][0]['horario'];
            usuario.activado = res['DATA'][0]['activado'];                    
            usuario.registrado = res['DATA'][0]['registrado'];                    
            usuario.destacado = res['DATA'][0]['destacado'];
            usuario.premium = res['DATA'][0]['premium'];
            usuario.tipousuario = res['DATA'][0]['tipousuario'];
            usuario.esFavorito = res['DATA'][0]['esFavorito'];                       
            usuario.video = res['DATA'][0]['video'];
            usuario.geo = res['DATA'][0]['geo'];
            usuario.instagram = res['DATA'][0]['instagram'];
            usuario.twitter = res['DATA'][0]['twitter'];
            usuario.facebook = res['DATA'][0]['facebook'];
            usuario.pais = res['DATA'][0]['pais']; */
            
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

  getLocalaesMin():Observable<LocalMin[]>{
    const headers = new HttpHeaders()
    .set("Authorization", this.GLOBALES.TOKEN);
    return new Observable((observer)=>{
      this.http.get(this.urlAllMin, {headers}).subscribe(
        res => {
          if(res['STATUS']=="OK"){
            let usuarios:LocalMin[] = new Array();
            for(let i = 0; i< res['DATA'].length;i++){
              let usuario = new LocalMin();
              usuario.id = res['DATA'][i]['id'];
              usuario.nlocal = res['DATA'][i]['nlocal'];
              usuario.fotoperfil = res['DATA'][i]['fotoperfil'];
              usuario.localidad = res['DATA'][i]['localidad'];
              usuario.provincia = res['DATA'][i]['provincia'];
              usuario.descripcion = res['DATA'][i]['descripcion'];
             
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
          console.log("ERROR");
          console.log(err);
        }
      )
    });
  }

  getLocalById(id:number):Observable<RespuestaDatos>{
    return new Observable((observer)=>{
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
      this.http.get(this.urlLocalId + id, {headers}).subscribe(
        (res) =>{ 
          console.log("entra");
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
