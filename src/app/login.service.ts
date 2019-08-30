import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Globales } from './Globales';
import 'rxjs/add/operator/map';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {  

  urlLoginLocal:string;
  urlLoginArtista:string;
  urlLoginUser:string;
  urlValidUser:string;

  isLogged:boolean = false;
  constructor(
    private http: HttpClient, 
    private GLOBALES:Globales, 
    private ss:StorageService,
    private router:Router) {
    this.urlLoginLocal = this.GLOBALES.URL_API + 'local/signin';
    this.urlLoginArtista = this.GLOBALES.URL_API + 'artista/signin';
    this.urlLoginUser = this.GLOBALES.URL_API + 'user/signin';
    this.urlValidUser = this.GLOBALES.URL_API + 'validuser';
  }

  checkIfLogged(){
    return this.isLogged;
  }

  login(scope:number, email:string, password:string){ 
    let body = {"email":email,"password":password};
    this.GLOBALES.SCOPE = scope;
    if(scope === this.GLOBALES.ARTISTA_SCOPE){
      //return this.http.get(this.GLOBALES.URL_API+'alllocalidades');      
      return this.http.post(this.urlLoginArtista,body);
    }else if(scope === this.GLOBALES.LOCAL_SCOPE){
      return this.http.post(this.urlLoginLocal,body);
    }else if(scope === this.GLOBALES.USER_SCOPE){
      return this.http.post(this.urlLoginUser,body);
    }
  }

  validuser():Observable<boolean>{
    let body = {"token":this.ss.getToken()};
    return new Observable<boolean>(Observer => {
      if(this.GLOBALES.LOGGED==false){
        this.http.post(this.urlValidUser, body)
        .subscribe(
          res => {        
             if(res['STATUS']==='OK'){
              this.GLOBALES.LOGGED = true;
              this.GLOBALES.TOKEN = this.ss.getToken();
              this.GLOBALES.SCOPE = this.ss.getScope();
              this.GLOBALES.USUARIO = this.ss.getUsuario();
              Observer.next(true);
              Observer.complete();
              this.enrutar();            
            }else{
              this.GLOBALES.LOGGED = false;
              this.ss.delUser();
              Observer.next(false);
              Observer.complete();        
            }
          },
          err => {
            console.log(err);
            Observer.next(false);
            Observer.complete();
          }
      );
      }else{
        Observer.next(true);
        Observer.complete();
      }     
    });
  }

  enrutar(){
      this.GLOBALES.SCOPE = this.ss.getScope();
      switch(this.GLOBALES.SCOPE){
        case this.GLOBALES.ARTISTA_SCOPE:
          this.router.navigateByUrl('artistas');
          break;
        case this.GLOBALES.LOCAL_SCOPE:
          this.router.navigateByUrl('locales');
          break;
        default: 
        
          //this.router.navigateByUrl('main');
        break;
      }
  }
}
