import { Injectable } from '@angular/core';
import { Artista } from './modelo/Artista';
import { Local } from './modelo/Local';
import { Localidad } from './modelo/Localidad';
import { TipoEvento } from './modelo/TipoEvento';
import { Usuario } from './modelo/Usuario';
//import { LocalStorage } from 'angular-local-storage';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Globales } from './Globales';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private iniciado:boolean;
  constructor(
    //private ls:LocalStorage,
    private http:HttpClient,
    private globales:Globales,
    private router:Router,
  ) {
    this.iniciado = false;
   }

  getUsuario(scope?:number):any{
    if(!scope){
      scope = this.globales.SCOPE;
    }
    if(scope==this.globales.USER_SCOPE){
      let usuario:Usuario = null;
      if(localStorage.getItem('usuario')){
        usuario = JSON.parse(localStorage.getItem('usuario'));
      }
      return usuario;
    }

    if(scope==this.globales.ARTISTA_SCOPE){
      let artista:Artista = null;
      if(localStorage.getItem('artista')){
        artista = JSON.parse(localStorage.getItem('artista'));
      }
      return artista;
    }

    if(scope==this.globales.LOCAL_SCOPE){
      let local:Local = null;
      if(localStorage.getItem('local')){
        local = JSON.parse(localStorage.getItem('local'));
      }
      return local;
    }
    
  }

  delUser(scope?:number):boolean{
    let errores:boolean = true;

    if(!scope){
      scope = this.globales.SCOPE;
    }
    try{
      switch(scope){
        case this.globales.USER_SCOPE:{
          if(localStorage.getItem('usuario')){
            localStorage.removeItem('usuario');
          }          
          break;
        }
        case this.globales.ARTISTA_SCOPE:{
          if(localStorage.getItem('artista')){
            localStorage.removeItem('artista');
          }          
          break;
        }
        case this.globales.LOCAL_SCOPE:{
          if(localStorage.getItem('local')){
            localStorage.removeItem('local');
          }          
          break;
        }
      }
      errores = this.saveScope(-1) && this.saveToken("");
      this.globales.USUARIO = null;
      this.globales.LOGGED = false;
      this.iniciado = false;
    }catch(error){
      errores = false;
    }
    return errores;

  }

  saveUsuario(scope?:number):boolean{
    let errores:boolean = true;
    if(!scope){
      scope = this.globales.SCOPE;
    }
    try{
      switch(scope){
        case this.globales.USER_SCOPE:{
          if(localStorage.getItem('usuario')){
            localStorage.removeItem('usuario');
          }
          localStorage.setItem('usuario',JSON.stringify(this.globales.USUARIO));
          break;
        }
        case this.globales.ARTISTA_SCOPE:{
          if(localStorage.getItem('artista')){
            localStorage.removeItem('artista');
          }
          localStorage.setItem('artista',JSON.stringify(this.globales.USUARIO));
          break;
        }
        case this.globales.LOCAL_SCOPE:{
          if(localStorage.getItem('local')){
            localStorage.removeItem('local');
          }
          localStorage.setItem('local',JSON.stringify(this.globales.USUARIO));
          break;
        }
      }
    }catch(error){
      errores = false;
    }
    

    return errores;
  }

  saveScope(scope?:number):boolean{
    let noErrors = true;
    try{
      if(!scope){
        scope = this.globales.SCOPE;
      }else{
        this.globales.SCOPE = scope;
      }
      if(localStorage.getItem('scope')){
        localStorage.removeItem('scope');
      }
      localStorage.setItem('scope',"" + scope);
    }catch(err){
      noErrors = false;
    }
    return noErrors;
    
  }

  getScope():number{
    if(this.globales.SCOPE>0){
      return this.globales.SCOPE;
    }else{
      if(localStorage.getItem('scope')){
        return +localStorage.getItem('scope');
      }else{
        return -1;
      }
    }
  }

  saveToken(token?:string):boolean{
    let noErrors:boolean = true;
    try {
      if(token===null){
        token = this.globales.TOKEN;
      }else{
        this.globales.TOKEN = token;
      }
      if(localStorage.getItem('token')){
        localStorage.removeItem('token');
      }
      localStorage.setItem('token',"" + token);
    } catch (error) {
      noErrors = false;
    }
    return noErrors;
  }

  getToken():string{
    if(this.globales.TOKEN != null && this.globales.TOKEN != ""){
      return this.globales.TOKEN;
    }else{
      if(localStorage.getItem('token')){
        return localStorage.getItem('token');
      }else{
        return "";
      }
    }
  }



  



}
