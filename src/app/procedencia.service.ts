import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Globales } from './Globales';
import { Observable, Subscriber } from 'rxjs';
import { AgmCoreModule } from '@agm/core';


@Injectable({
  providedIn: 'root'
})
export class ProcedenciaService {

  urlGoogleApi = 'https://maps.googleapis.com/maps/api/geocode/json?';

  urlPaises:string;
  urlComunidades:string;
  urlProvinciasByCom:string;
  urlLocalidadesByProv:string;

  constructor(private http:HttpClient, private GLOBALES:Globales) { 
    this.urlPaises = GLOBALES.URL_API + 'allpaises';    
    this.urlComunidades = GLOBALES.URL_API + 'allcomunidades';
    this.urlProvinciasByCom = GLOBALES.URL_API + 'provinciasbycom/';
    this.urlLocalidadesByProv = GLOBALES.URL_API + 'localidadesbyprov/';
  }

  public getLocalidades():Observable<any>{
    return this.http.get(this.urlPaises);
  }

  public getComunidades():Observable<any>{
    return this.http.get(this.urlComunidades);
  }

  public getLocalidadesByProvincia(provincia:string):Observable<any>{
    return this.http.get(this.urlLocalidadesByProv + provincia);//.map((res:Response) => res.json());
  }

  public getProvincias():Observable<any>{
    return this.http.get(this.urlComunidades);
  }

  public getProvinciasByComunidad(comunidad:string):Observable<any>{
    return this.http.get(this.urlProvinciasByCom + comunidad);
  }

  public getPaises():Observable<any>{
    return this.http.get(this.urlPaises);
  }

  public testObservable():Observable<number>{
    return new Observable((observer) => {    
      // observable execution
      setTimeout(() => {
        observer.next(42);
    }, 1000);

    setTimeout(() => {
        observer.next(43);
    }, 2000);

    setTimeout(() => {
        observer.complete();
    }, 3000);
    });
  }

  public getUserLocation():Observable<boolean>{
    return new Observable((observer) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
              this.GLOBALES.LAT = position.coords.latitude;
              this.GLOBALES.LONG = position.coords.longitude;

              let url:string = this.urlGoogleApi + "latlng=" + this.GLOBALES.LAT + "," + this.GLOBALES.LONG + "&key=" + this.GLOBALES.APIKEY;

              this.http.get(url)
                .subscribe(
                  (res) => {
                    console.log("Entra en location");
                    console.log(res);
                    if(res['results'][7]['address_components'][1]!=null){
                      let long = res['results'][7]['address_components'].length -1;
                      this.GLOBALES.COMUNIDAD_STR = res['results'][7]['address_components'][long-1]['long_name'];
                      this.GLOBALES.PAIS = res['results'][7]['address_components'][long]['short_name'];    
                      observer.next(true); 
                      console.log(this.GLOBALES.COMUNIDAD_STR + " -- " + this.GLOBALES.PAIS);                 
                    }else if(res['results'][6]['address_components'][1]!=null){
                      let long = res['results'][6]['address_components'].length -1;
                      this.GLOBALES.COMUNIDAD_STR = res['results'][6]['address_components'][long-1]['long_name'];
                      this.GLOBALES.PAIS = res['results'][6]['address_components'][long]['short_name'];    
                      observer.next(true);    
                      console.log(this.GLOBALES.COMUNIDAD_STR + " -- " + this.GLOBALES.PAIS);                 
                    }
                    else{
                      console.log(this.GLOBALES.COMUNIDAD_STR + " -- " + this.GLOBALES.PAIS);                                       
                      observer.next(false);
                    }
                    observer.complete();

                        
                  },
                  (err) => {
                    console.log("Entra en error ");
                    console.log(err);
                  }
                )
              
              console.log("Latitud: " + this.GLOBALES.LAT + " Longitud: " + this.GLOBALES.LONG);
              console.log(position);                  
            },
            error => {
                observer.next(false);
                observer.complete();
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
        
      }else {
        observer.next(false);
        observer.complete();
        alert("Geolocation is not supported by this browser.");
      }
  });
  }

  private showPosition(position){
    this.GLOBALES.LAT = position.coords.latitude;
    this.GLOBALES.LONG = position.coords.longitude;

    let url:string = this.urlGoogleApi + "latlng=" + this.GLOBALES.LAT + "," + this.GLOBALES.LONG + "&key=" + this.GLOBALES.APIKEY;

    this.http.get(url)
      .subscribe(
        (res) => {
          console.log("Entra en location");
          console.log(res);
          this.GLOBALES.COMUNIDAD_STR = res['results'][7]['address_components'][0]['long_name'];
          this.GLOBALES.PAIS = res['results'][7]['address_components'][1]['short_name']; 
          this.GLOBALES.SEMAFORO_PROCEDENCIA--;        
        },
        (err) => {
          console.log("Entra en error ");
          console.log(err);
          this.GLOBALES.SEMAFORO_PROCEDENCIA--;
        }
      )
    
    console.log("Latitud: " + this.GLOBALES.LAT + " Longitud: " + this.GLOBALES.LONG);
  }



  
}
