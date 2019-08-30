import { Component, OnInit } from '@angular/core';
import {Globales} from '../Globales';
import {Texto} from '../Texto';

import {FormControl, FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { MispinnerComponent } from '../mispinner/mispinner.component' ;

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

import { LoginService } from '../login.service';
import { Router } from '../../../node_modules/@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required]);

  hide=true;
  
  errorText:string = "Ha ocurrido algún error en el login";
  errorLogin:boolean = false; //Si ha habido algún error de login
  checkingLogin:boolean = false; //Si se está haciendo login

  getErrorMessage(element:FormControl) {
    return element.hasError('required') ? this.Texto.i.NO_EMPTY:
    element.hasError('email') ? this.Texto.i.FORMAT_ERROR_EMAIL:
    "ERROR";
  }

  constructor(
    private GLOBALES:Globales, 
    private Texto:Texto, 
    private fb:FormBuilder, 
    private loginService:LoginService, 
    private router: Router,
    private ss:StorageService,
    private socialAuthService: AuthService) {}
  
  ngOnInit() {
    this.checkingLogin = true;
    this.loginService.validuser()
      .subscribe(
        res => {          
          this.checkingLogin = false;  
          if(res){
            this.enrutar();        
          }
            
        },
        err => {
          this.checkingLogin = false;
          console.log(err);
        }
    );

    // if(this.GLOBALES.LOGGED === true){
    //   this.router.navigateByUrl('main');
    // }
    //console.log("Entra en home " + this.GLOBALES.LOGGED);

   
  }

  log(cadena:string){
    console.log(cadena);
  }

  login(){
    this.errorLogin = false;
    this.checkingLogin = true;
    console.log("Entra");
    this.loginService.login( this.GLOBALES.SCOPE,this.user.value,this.pass.value)
    .subscribe(
      res => {
        console.log(res);
        this.checkingLogin = false;
        if(res['STATUS'] === 'KO'){
          console.log('Problema login');
          this.errorText = res['ERROR'];
          this.errorLogin = true;
          setTimeout(()=>{
            this.errorLogin = false;
            this.pass.setValue(null);
            this.pass.clearValidators();
          },3500);
        }else{
          if(res['STATUS']==='OK'){
          console.log("Login OK");
          console.log(res);
          this.GLOBALES.TOKEN = res['DATA']['token'];
          this.ss.saveToken(this.GLOBALES.TOKEN);
          this.ss.saveScope(this.GLOBALES.SCOPE);
          this.GLOBALES.LOGGED = true;          

          //Guardar token
          this.enrutar();
          }
          else{
            this.errorLogin=true;
            this.errorText = this.Texto.i.SOME_THING_WAS_WRONG;
          }
        }
      },
      err => {
        this.checkingLogin = false;
        console.log("ERROR-LOGIN");
        console.log(err);
      }
    );
  }

  changeScope(scope:number){
    //console.log("Cambiando SCOPE");
    //console.log(scope);
    this.GLOBALES.SCOPE = scope;
    this.user.setValue(null);
    this.user.clearValidators();
    this.pass.setValue(null);
    this.pass.clearValidators();
  }


  registrar(){
    switch(this.GLOBALES.SCOPE){
      case this.GLOBALES.ARTISTA_SCOPE:
        this.router.navigateByUrl('regartista');
        break;
      case this.GLOBALES.LOCAL_SCOPE:
        this.router.navigateByUrl('reglocal');
        break;
      default: 
        this.router.navigateByUrl('regusuario');
      break;

    }
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
            
      }
    );
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
      case this.GLOBALES.USER_SCOPE:
        this.router.navigateByUrl('buscarevento');
        break;
        case this.GLOBALES.USER_UR_SCOPE: //Scope 0
          this.router.navigateByUrl('buscarevento');
          break;
      default: 
        this.router.navigateByUrl('');
        //this.router.navigateByUrl('main');
      break;

    }
  }

}
