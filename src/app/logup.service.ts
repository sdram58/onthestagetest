import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Globales } from './Globales';
import { Observable, Subscriber } from 'rxjs';
import { Artista, ArtistaNoReg } from './modelo/Artista';
import { Local, LocalNoReg } from './modelo/Local';
import { Usuario } from './modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LogupService {

  private urlArtistaSignUp:string;
  private urlLocalSignUp:string;
  private urlLocalNoRegSignUp:string;
  private urlArtistaNoRegSignUp:string;
  private urlUserSignUp:string;
  constructor(private http:HttpClient,private GLOBALES:Globales) {
    this.urlArtistaSignUp = GLOBALES.URL_API + "artista/signup";
    this.urlLocalSignUp = GLOBALES.URL_API + "local/signup";
    this.urlLocalNoRegSignUp = GLOBALES.URL_API + "local/signupnolocal";
    this.urlArtistaNoRegSignUp = GLOBALES.URL_API + "artista/signupnoartista";
    this.urlUserSignUp = GLOBALES.URL_API + "user/signup";
  }


  artistaSignUp(a:Artista,foto_perfil:File,fotos:File[]):Observable<string>
  {
    
    const fd = new FormData();
    fd.append('email',a.email);
    fd.append('nombre',a.nombre);
    fd.append('password',a.m_pass);
    fd.append('nartistico',a.nartista);
    fd.append('tespectaculo',""+a.tipo_espectaculo.id);
    fd.append('pais',a.pais.codigo);
    fd.append('localidad',""+a.localidad.id);
    fd.append('integrantes',""+a.integrantes);
    fd.append('descespectaculo',a.desc_espectaculo);
    fd.append('cache',""+a.cache);
    fd.append('recursos',a.recursos?"1":"0");
    fd.append('facebook',a.facebook);
    fd.append('instagram',a.instagram);
    fd.append('twitter',a.twitter);
    fd.append('video',a.video);
    fd.append('destacado',a.destacado?"1":"0");
    fd.append('premium',a.premium?"1":"0");
    fd.append('activado',a.activado?"1":"0");
    fd.append('registrado',a.registrado?"1":"0");

    if(foto_perfil){
      fd.append('fotoperfil',foto_perfil,foto_perfil.name);
    }    

    for(let foto of fotos){
      fd.append('foto[]',foto,foto.name);
    }
    return new Observable((observer)=>{
      this.http.post(this.urlArtistaSignUp,fd).subscribe(
        (res) =>{
        console.log(res);
        if(res['STATUS'] && res['STATUS']=='OK'){
          console.log("Registrado");
          observer.next('OK');
        }else{
          if(res['STATUS'] && res['STATUS']=='KO'){
            console.log("Error registro");
            console.log(res["ERROR"]);
            observer.next(res["ERROR"]);
          }else{
            console.log('Error registro general');
            observer.next('Unspected Error');
          }
        }
        observer.complete();
    },
    (err)=>{
      console.log(err);
      observer.next('KO');
      observer.complete();
    });
  });
    

  }


  localSignUp(l:Local,foto_perfil:File,fotos:File[]):Observable<string>
  {
    
    const fd = new FormData();
    fd.append('email',l.email);
    fd.append('nombre',l.nombre);
    fd.append('apellidos',"");
    fd.append('password',l.m_pass);
    fd.append('nlocal',l.nlocal);
    fd.append('telf',""+l.telf);
    fd.append('descripcion',""+l.descripcion);
    fd.append('pais',l.pais.codigo);
    fd.append('direccion',l.direccion);
    fd.append('localidad',""+l.localidad.id);
    fd.append('pweb',l.web);
    fd.append('facebook',l.facebook);
    fd.append('instagram',l.instagram);
    fd.append('twitter',l.twitter);
    fd.append('video',l.video);
    fd.append('latitud',""+l.latitud);
    fd.append('longitud',""+l.longitud);
    fd.append('destacado',l.destacado?"1":"0");
    fd.append('premium',l.premium?"1":"0");
    fd.append('activado',l.activado?"1":"0");
    fd.append('registrado',l.registrado?"1":"0");
    if(foto_perfil){
      fd.append('fotoperfil',foto_perfil,foto_perfil.name);
    }
    

    for(let foto of fotos){
      fd.append('foto[]',foto,foto.name);
    }
    return new Observable((observer)=>{
        this.http.post(this.urlLocalSignUp,fd).subscribe(
          (res) =>{
          console.log(res);
          if(res['STATUS'] && res['STATUS']=='OK'){
            console.log("Registrado");
            observer.next('OK');
          }else{
            if(res['STATUS'] && res['STATUS']=='KO'){
              console.log("Error registro");
              console.log(res["ERROR"]);
              observer.next(res["ERROR"]);
            }else{
              console.log('Error registro general');
              observer.next('Unspected Error');
            }
          }
          observer.complete();
      },
      (err)=>{
        console.log(err);
        observer.next('KO');
        observer.complete();
      });
    });
    

  }

  artistaNoRegSignUp(a:ArtistaNoReg,foto:File):Observable<any[]>
  {
    
    const fd = new FormData();
    fd.append('nartistico',a.nartista);
    fd.append('descespectaculo',""+a.desc_espectaculo);
    fd.append('tespectaculo',""+a.tipo_espectaculo.id);
    if(foto){
      fd.append('foto',foto,foto.name);
    }
    return new Observable((observer)=>{
        this.http.post(this.urlArtistaNoRegSignUp,fd).subscribe(
          (res) =>{
          let mRes = new Array();
          if(res['STATUS'] && res['STATUS']=='OK'){            
            mRes['res']=true;
            mRes['data']=res['DATA'];
            observer.next(mRes);
          }else{
            if(res['STATUS'] && res['STATUS']=='KO'){  
              mRes['res']=false;
              mRes['data']=res["ERROR"];            
              observer.next(mRes);
            }else{
              console.log('Error registro general');
              observer.next(null);
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

  localNoRegSignUp(l:LocalNoReg,foto:File):Observable<any>
  {
    const fd = new FormData();
    fd.append('nlocal',l.nlocal);
    fd.append('descripcion',""+l.descripcion);
    fd.append('pais',l.pais.codigo);
    fd.append('direccion',l.direccion);
    fd.append('localidad',""+l.localidad.id);
    fd.append('latitud',""+l.latitud);
    fd.append('longitud',""+l.longitud);
    if(foto){
      fd.append('foto',foto,foto.name);
    }
    return new Observable((observer)=>{
      this.http.post(this.urlLocalNoRegSignUp,fd).subscribe(
        (res) =>{
        let mRes = new Array();
        if(res['STATUS'] && res['STATUS']=='OK'){            
          mRes['res']=true;
          mRes['data']=res['DATA'];
          observer.next(mRes);
        }else{
          if(res['STATUS'] && res['STATUS']=='KO'){  
            mRes['res']=false;
            mRes['data']=res["ERROR"];            
            observer.next(mRes);
          }else{
            console.log('Error registro general');
            observer.next(null);
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

  userSignUp(u:Usuario,foto_perfil:File):Observable<string>
  {
    
    const fd = new FormData();
    fd.append('email',u.email);
    fd.append('nombre',u.nombre);
    fd.append('apellidos',u.apellidos);
    fd.append('password',u.password);    
    let fecha:string = this.GLOBALES.fechaToString(new Date(u.fnac));
    fd.append('fnac',fecha);
    fd.append('premium',u.premium?"1":"0");
    fd.append('activado',u.activado?"1":"0");
    fd.append('registrado',u.registrado?"1":"0");
    console.log("Fecha:  " + fecha);
    if(foto_perfil){
      fd.append('foto',foto_perfil,foto_perfil.name);
    }    

    return new Observable((observer)=>{
      this.http.post(this.urlUserSignUp,fd).subscribe(
        (res) =>{
        console.log(res);
        if(res['STATUS'] && res['STATUS']=='OK'){
          observer.next('OK');
        }else{
          if(res['STATUS'] && res['STATUS']=='KO'){
            console.log("Error registro");
            console.log(res["ERROR"]);
            observer.next(res["ERROR"]);
          }else{
            console.log('Error registro general');
            observer.next('Unspected Error');
          }
        }
        observer.complete();
    },
    (err)=>{
      console.log(err);
      observer.next('KO');
      observer.complete();
    });
  });
    

  }

}
