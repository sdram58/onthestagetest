import { Injectable } from '@angular/core';
import { Globales, Respuesta, RespuestaDatos } from './Globales';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { Artista } from './modelo/Artista';
import { Localidad } from './modelo/Localidad';
import { TipoEvento } from './modelo/TipoEvento';
import { StorageService } from './storage.service';
import { ArtistaMin } from './modelo/ArtistaMin';
import { Evento } from './modelo/Evento';
import { Texto } from './Texto';
import { EventoMin } from './modelo/EventoMin';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  urlAddEvent:string = "";
  urlEditEvent:string = "";
  urlEventosLocal:string = "";
  urlEventosArtista:string = "";
  urlEventoId:string = "";
  urlDeleteEventoId:string = "";
  urlEventosFavoritos:string = "";
  urlArtistasFavoritos:string = "";
  urlLocalesFavoritos:string = "";
  urlHacerLocalFavorito:string = "";
  urlHacerEventoFavorito:string = "";
  urlHacerArtistaFavorito:string = "";
  urlAsistenciaEvento:string = "";
  urlEventoNumFavoritos:string = "";
  urlArtistaNumFavoritos:string = "";
  urlLocalNumFavoritos:string = "";
  urlEventosDestacados:string = "";
  urlEventosFiltrados:string = "";


  constructor(
    private http: HttpClient, 
    private GLOBALES:Globales, 
    private ss:StorageService,
    private Texto:Texto) {
    this.urlAddEvent = this.GLOBALES.URL_API + 'evento/newevento';
    this.urlEditEvent = this.GLOBALES.URL_API + 'evento/update/';
    this.urlEventosLocal = this.GLOBALES.URL_API + 'evento/local/';
    this.urlEventosArtista = this.GLOBALES.URL_API + 'evento/artista/';
    this.urlEventoId = this.GLOBALES.URL_API + 'evento/';
    this.urlDeleteEventoId = this.GLOBALES.URL_API + 'evento/';
    this.urlEventosFavoritos = this.GLOBALES.URL_API + 'favorito/usuario/evento';
    this.urlArtistasFavoritos = this.GLOBALES.URL_API + 'favorito/usuario/artistas';
    this.urlLocalesFavoritos = this.GLOBALES.URL_API + 'favorito/usuario/locales';
    this.urlHacerEventoFavorito = this.GLOBALES.URL_API + 'favorito/usuario/evento/';
    this.urlHacerArtistaFavorito = this.GLOBALES.URL_API + 'favorito/usuario/artista/';
    this.urlHacerLocalFavorito = this.GLOBALES.URL_API + 'favorito/usuario/local/';
    this.urlAsistenciaEvento = this.GLOBALES.URL_API + 'asistencia/usuario/evento/';
    this.urlEventoNumFavoritos = this.GLOBALES.URL_API + 'numfavoritos/evento/';
    this.urlArtistaNumFavoritos = this.GLOBALES.URL_API + 'numfavoritos/artista/';
    this.urlLocalNumFavoritos = this.GLOBALES.URL_API + 'numfavoritos/local/';
    this.urlEventosDestacados = this.GLOBALES.URL_API + 'evento/destacados';
    this.urlEventosFiltrados = this.GLOBALES.URL_API + 'evento/getfiltered';
   }

  insertEvent(e:Evento,foto:File):Observable<Respuesta>{
    
    const fd = new FormData();
    fd.append('dia',e.dia);
    fd.append('hora',e.hora);
    fd.append('nevento',e.nombre);
    fd.append('edad_minima',""+e.edad_minima);
    fd.append('precio',""+e.precio);
    fd.append('local',""+e.local.id);
    fd.append('descripcion',e.descripcion);
    fd.append('destacado',e.destacado?"1":"0");
    fd.append('ofertas',e.ofertas);
    fd.append('asistentes',""+e.asistentes);
    fd.append('tickets',e.tickets);
    fd.append('autor',"" + e.autor);
    fd.append('scope_autor',"" + e.scope_autor);
    fd.append('token',this.GLOBALES.TOKEN);

    for(let artista of e.artistas){
      fd.append('artista[]',""+artista.id);
    }
    
    if(foto){
      fd.append('foto',foto,foto.name);
    }
    
    return new Observable((observer)=>{
        this.http.post(this.urlAddEvent,fd).subscribe(
          (res) =>{           
            if(res['STATUS'] && res['STATUS']=='OK'){
              let mRes:Respuesta = new Respuesta();
              mRes.res=true;
              mRes.data=this.Texto.i.ADDED_EVENT_OK;
              observer.next(mRes);
            }else{
              if(res['STATUS'] && res['STATUS']=='KO'){
                let mRes:Respuesta = new Respuesta();
                mRes.res=false;
                mRes.data=this.Texto.i.ADDED_EVENT_KO + " " + res["ERROR"];
                observer.next(mRes);                
              }else{
                let mRes:Respuesta = new Respuesta();
                mRes.data = 'Unspected Error';
                mRes.res = false;
                observer.next(mRes);  
              }
            }
            observer.complete();
          },
          (err)=>{
            console.log(err);
            observer.next(null);
            observer.complete();
          });
    });
  
  }


  updateEvent(e:Evento,foto:File):Observable<Respuesta>{
    
    const fd = new FormData();
    fd.append('dia',e.dia);
    fd.append('hora',e.hora);
    fd.append('nevento',e.nombre);
    fd.append('edad_minima',""+e.edad_minima);
    fd.append('precio',""+e.precio);
    fd.append('local',""+e.local.id);
    fd.append('descripcion',e.descripcion);
    fd.append('destacado',e.destacado?"1":"0");
    fd.append('ofertas',e.ofertas);
    fd.append('asistentes',""+e.asistentes);
    fd.append('tickets',e.tickets);
    fd.append('autor',"" + e.autor);
    fd.append('scope_autor',"" + e.scope_autor);
    fd.append('token',this.GLOBALES.TOKEN);

    for(let artista of e.artistas){
      fd.append('artista[]',""+artista.id);
    }
    
    if(foto){
      fd.append('foto',foto,foto.name);
    }
    
    return new Observable((observer)=>{
      let url = this.urlEditEvent+e.id;
      console.log(url);
        this.http.post(this.urlEditEvent+e.id,fd).subscribe(
          (res) =>{           
            if(res['STATUS'] && res['STATUS']=='OK'){
              let mRes:Respuesta = new Respuesta();
              mRes.res=true;
              mRes.data=this.Texto.i.ADDED_EVENT_OK;
              observer.next(mRes);
            }else{
              if(res['STATUS'] && res['STATUS']=='KO'){
                let mRes:Respuesta = new Respuesta();
                mRes.res=false;
                mRes.data=this.Texto.i.ADDED_EVENT_KO + " " + res["ERROR"];
                observer.next(mRes);                
              }else{
                let mRes:Respuesta = new Respuesta();
                mRes.data = 'Unspected Error';
                mRes.res = false;
                observer.next(mRes);  
              }
            }
            observer.complete();
          },
          (err)=>{
            console.log(err);
            observer.next(null);
            observer.complete();
          });
    });
    

  }

  getMisEventos(proximo:boolean):Observable<RespuestaDatos>{
    let url = "";
    if(this.GLOBALES.SCOPE == this.GLOBALES.ARTISTA_SCOPE){
      url = this.urlEventosArtista;
    }else if(this.GLOBALES.SCOPE == this.GLOBALES.LOCAL_SCOPE){
      url = this.urlEventosLocal;
    }
    return new Observable((observer)=>{
      let query = (proximo)?"?proximos=1":"?anteriores=1";
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
        if(this.GLOBALES.USUARIO === undefined){
          observer.next(null);
          observer.complete();
        }else{
      this.http.get(url + this.GLOBALES.USUARIO.id+query, {headers}).subscribe(
        (res) =>{ 
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
      }
    });    
  }

  getEventosDeUsuario(scopeUser:number, idUser:number, proximo:boolean):Observable<RespuestaDatos>{
    let url = "";
    if(scopeUser == this.GLOBALES.ARTISTA_SCOPE){
      url = this.urlEventosArtista;
    }else if(scopeUser == this.GLOBALES.LOCAL_SCOPE){
      url = this.urlEventosLocal;
    }
    return new Observable((observer)=>{
      let query = (proximo)?"?proximos=1":"?anteriores=1";
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
        if(this.GLOBALES.USUARIO === undefined || idUser === undefined){
          observer.next(null);
          observer.complete();
        }else{
      this.http.get(url + idUser+query, {headers}).subscribe(
        (res) =>{ 
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
      }
    });    
  }

  getEventById(id:number):Observable<RespuestaDatos>{
    return new Observable((observer)=>{
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
      this.http.get(this.urlEventoId + id, {headers}).subscribe(
        (res) =>{ 
          let mRes:RespuestaDatos = new RespuestaDatos(); 
          if(res['STATUS'] && res['STATUS']=='OK'){
            mRes.res = true;
            mRes.data = res['DATA'];
            observer.next(mRes);
          }else if(res['STATUS'] && res['STATUS']=='KO'){
            mRes.res = false;
            mRes.data = [res['ERROR']];            
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

  getEventosDestacados():Observable<RespuestaDatos>{
    return new Observable((observer)=>{
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
      this.http.get(this.urlEventosDestacados, {headers}).subscribe(
        (res) =>{ 
          let mRes:RespuestaDatos = new RespuestaDatos(); 
          if(res['STATUS'] && res['STATUS']=='OK'){
            mRes.res = true;
            mRes.data = res['DATA'];
            observer.next(mRes);
          }else if(res['STATUS'] && res['STATUS']=='KO'){
            mRes.res = false;
            mRes.data = [res['ERROR']];            
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

  deleteEventById(id:number):Observable<Respuesta>{
    return new Observable((observer)=>{
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
      this.http.delete(this.urlDeleteEventoId + id, {headers}).subscribe(
        (res) =>{           
          let mRes:Respuesta = new Respuesta();

          if(res['STATUS'] && res['STATUS']=='OK'){
            mRes.res = true;
            mRes.data = res['DATA'];
            observer.next(mRes);
          }else if(res['STATUS'] && res['STATUS']=='KO'){
            mRes.res = false;
            mRes.data = res['ERROR'];
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


/*   getArtistasByEvent(evento:Evento):Observable<RespuestaDatos>{
    return new Observable((observer)=>{
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
      this.http.get(this.urlDeleteEventoId + evento.id, {headers}).subscribe(
        (res) =>{ 
          console.log(res)
          let mRes:Respuesta = new Respuesta();

          if(res['STATUS'] && res['STATUS']=='OK'){
            mRes.res = true;
            mRes.data = res['DATA'];
            observer.next(mRes);
          }else if(res['STATUS'] && res['STATUS']=='KO'){
            mRes.res = false;
            mRes.data = res['error'];
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

  } */


  //Recibe el numero de favoritos que tiene un determinado Evento, Local o Artista identificado por su id
  getNumFavoritos(id:number, scope:number):Observable<number>{
    return new Observable((observer)=>{
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);

        let url=this.urlEventoNumFavoritos;
        switch(scope){
          case this.GLOBALES.LOCAL_SCOPE:
            url = this.urlLocalNumFavoritos;
            break;
          case this.GLOBALES.ARTISTA_SCOPE:
            url = this.urlArtistaNumFavoritos;
            break;
          default:
            url = this.urlEventoNumFavoritos;
            break;
        }
      this.http.get(url+id, {headers}).subscribe(
        (res) =>{ 
          if(res['STATUS'] && res['STATUS']=='OK'){
            observer.next(res['COUNT']);
          }else if(res['STATUS'] && res['STATUS']=='KO'){
            observer.next(-1);
          }
          observer.complete();
        },
        (err) =>{
          console.log(err);
          observer.next(-1);
          observer.complete();
        });
    });
  }

  setFavorito(id:number, scope:number, hacer:boolean):Observable<number>{
    return new Observable((observer)=>{
      let url=this.urlHacerEventoFavorito;
      switch(scope){
        case this.GLOBALES.LOCAL_SCOPE:
          url = this.urlHacerLocalFavorito;
          break;
        case this.GLOBALES.ARTISTA_SCOPE:
          url = this.urlHacerArtistaFavorito;
          break;
        default:
          url = this.urlHacerEventoFavorito;
          break;
      }
      let mHacer = hacer? 1:0;
      let cuerpo = {
        token: this.GLOBALES.TOKEN,
        hacer: mHacer
      }
      this.http.post(url+id, cuerpo).subscribe(
        (res) =>{           
          if(res['STATUS'] && res['STATUS']=='OK'){
            observer.next(res['COUNT']*1);
          }else if(res['STATUS'] && res['STATUS']=='KO'){
            observer.next(-1);
          }
          observer.complete();
        },
        (err) =>{
          console.log(err);
          observer.next(-1);
          observer.complete();
        });
    });
  }

  setAsistire(idEvento:number, hacer:boolean):Observable<number>{
    return new Observable((observer)=>{      
      let mHacer = hacer? 1:0;
      let cuerpo = {
        token: this.GLOBALES.TOKEN,
        hacer: mHacer
      }
      this.http.post(this.urlAsistenciaEvento+idEvento, cuerpo).subscribe(
        (res) =>{           
          if(res['STATUS'] && res['STATUS']=='OK'){
            observer.next(res['COUNT']*1);
          }else if(res['STATUS'] && res['STATUS']=='KO'){
            observer.next(-1);
          }
          observer.complete();
        },
        (err) =>{
          console.log(err);
          observer.next(-1);
          observer.complete();
        });
    });
  }

  //Devuelve los eventos filtrados
  getEventFiltered(filtro:string):Observable<RespuestaDatos>{
    let url = this.urlEventosFiltrados;

    return new Observable((observer)=>{
      let query = "?" + filtro;
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
        if(this.GLOBALES.USUARIO === undefined){
          observer.next(null);
          observer.complete();
        }else{
      this.http.get(url + query, {headers}).subscribe(
        (res) =>{ 
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
      }
    });    
  }
  
}
