// globals.ts
import { Injectable } from '@angular/core';
import { Artista } from './modelo/Artista';
import { Local } from './modelo/Local';
import { Usuario } from './modelo/Usuario';

export class Respuesta{
  res:boolean;
  data:string;
}

export class RespuestaDatos{
  res:boolean;
  data:any[];
}

@Injectable()
export class Globales {
  APP_NAME: string = 'OnTheStage';
  APIKEY: string = 'AIzaSyBHZehshhiFhCMHWqTj_bdedtEodI07s2M';
  LOGGED: boolean = true;
  USUARIO:any = null;
  USER_SCOPE:number = 1;
  USER_UR_SCOPE:number = 0; //Usuario no registrsado. GOOGLE O FACEBOOK
  ARTISTA_SCOPE :number =  3;
  LOCAL_SCOPE :number =  4;
  ADMIN_SCOPE :number =  5;
  SCOPE = -1;
  URL_API="https://onthestage.es/restapi/v1/";
  URL_ONTHESTAGE="https://onthestage.es";
  TOKEN:string="";
  LAT = -5000;
  LONG = -5000;
  PAIS = '';
  LOCALE = "es-ES";
  LOCALIDAD = -1;
  PROVINCIA = -1;
  COMUNIDAD = -1;
  COMUNIDAD_STR:string=null;
  SEMAFORO_PROCEDENCIA:number=0;
  NO_USER_IMAGE:string = "https://onthestage.es/img/nouser.png";
  LOADING_IMAGE:string = "https://onthestage.es/img/cargando.png";
  NOTFOUND_IMAGE:string = "https://onthestage.es/img/cargando.png";
  YOUTUBE_ON_IMAGE:string = "https://onthestage.es/img/youtubeon.png";
  YOUTUBE_OFF_IMAGE:string = "https://onthestage.es/img/youtubeoff.png";
  WEB_ON_IMAGE:string = "https://onthestage.es/img/webon.png";
  WEB_OFF_IMAGE:string = "https://onthestage.es/img/weboff.png";
  FACEBOOK_ON_IMAGE:string = "https://onthestage.es/img/facebookon.png";
  FACEBOOK_OFF_IMAGE:string = "https://onthestage.es/img/facebookoff.png";
  INSTAGRAM_ON_IMAGE:string = "https://onthestage.es/img/instagramon.png";
  INSTAGRAM_OFF_IMAGE:string = "https://onthestage.es/img/instagramoff.png";
  TWITTER_ON_IMAGE:string = "https://onthestage.es/img/twitteron.png";
  TWITTER_OFF_IMAGE:string = "https://onthestage.es/img/twitteroff.png";
  FAVORITO_ON_IMAGE:string = "https://onthestage.es/img/favoritoon.png";
  FAVORITO_OFF_IMAGE:string = "https://onthestage.es/img/favoritooff.png";
  ASISTIR_ON_IMAGE:string = "https://onthestage.es/img/asistiron.png";
  ASISTIR_OFF_IMAGE:string = "https://onthestage.es/img/asistiroff.png";
  COMPARTIR_IMAGE:string = "https://onthestage.es/img/compartir.png";
  NAVEGAR_IMAGE:string = "https://onthestage.es/img/navegar.png";
  NAVEGAR_PRESSED_IMAGE:string = "https://onthestage.es/img/navegarpressed.png";
  TICKETS_ON_IMAGE:string = "https://onthestage.es/img/ticketson.png";
  TICKETS_OFF_IMAGE:string = "https://onthestage.es/img/ticketsoff.png";
  SEPARATOR_URL:string = ";;";
  

  //Variables de estilo para añadirlas por código
  colorFacebook:string = "#3b5998";
  colorGoogle:string = "#F0F0F0";
  colorEvento:string = "#EC1B1B";
  colorEvento2:string = "#FFACAC";
  colorEventoClaro:string = "#FFEBEB";
  colorArtista:string = "#2000FF";
  colorArtista2:string = "#0000FF";
  colorArtistaClaro:string = "#E1F6FE";
  colorLocalClaro:string = "#E9FBE9";
  colorLocal:string = "#00B715";
  colorLocal2:string = "#C6F7C6";
  colorFavoritos:string = "#FF8000";
  colorBtnOnthestage:string = "#B7D4E1";
  colorGris:string = "#A0A0A0";
  colorGrisClaro:string = "#EDEDED";
  colorGrisMuyClaro:string = "#F7F7F7";
  colorGrisBorde:string = "#CCCCCC";
  colorMes:string = "#F0420A";
  color:string =  "#FF0000";
  colorFondoToolbar:string =  "#3f51b5";
  colorNegro:string = "#000000";
  alturaToolbar:string = "7vh";
  alturaBody:string = "93vh";
  tamanyoFuenteDefault:string ="1em";
  colorFuenteDefault:string = "#FFDDDD";
  colorPrimary="#3F51B5";
  colorPrimaryDark="#303F9F";
  colorAccent="#EC1B1B";
  colorFondo="#EDFDFE";
  colorTexto="#343b3f";
  colorFormOk="#A4C639";
  colorFormWrong="#FF0000";
  colorDisabled="#C8C5C4";
  colorHeader="#004553";
  colorFondoNick="#23266A";
  colorFondoViewPager="#999999";
  colorFondoSignup="#064E5D";
  fondoTitulo="#E4F7F9";
  checkDisabled="#757676";
  colorBlanco="#FFFFFF";
  colorBusquedas="#4267B2";
  colorDescripc="on:#FFF";
  colorSearchBar="#F3F3F3";
  colorLocalMuyClaro="#E5FAE4";
  colorFondoImagenes="#FDFDFD";
  colorFondoMenuInferior="#F1F1F1";


  FILTRO_QUERY="";

  constructor(){
    this.LOGGED = false;
  }

  public formatearFecha(fecha:string):string{
    let date = new Date(Date.UTC(this.getYear(fecha), this.getMonth(fecha)-1, this.getDay(fecha), 3, 0, 0));
   // let date = new Date(Date.UTC(2018, 0, 30, 3, 0, 0));
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }

  public getMonth(fecha:string):number{
    let partes = fecha.split("-");
    if(partes.length==1){
      partes = fecha.split("/");
    }
    if(partes[2].length == 4){
      return +partes[1];
    }
  }

  public getDay(fecha:string):number{
    let partes = fecha.split("-");
    if(partes.length==1){
      partes = fecha.split("/");
    }
    if(partes[2].length == 4){
      return +partes[0];
    }else{
      return +partes[2];
    }
  }

  public getYear(fecha:string):number{
    let partes = fecha.split("-");
    if(partes.length==1){
      partes = fecha.split("/");
    }
    if(partes[2].length == 4){
      return +partes[2];
    }else{
      return +partes[0];
    }
  }

  public dateAddDays(fecha:Date, days:number):Date{
    return new Date(fecha.getTime()+ (1000*60*60*24*days));
  }

  public fechaToString(fecha:Date){
    return fecha.getDate() + "-" + (fecha.getMonth()+1) + "-" + fecha.getFullYear();
  }
}