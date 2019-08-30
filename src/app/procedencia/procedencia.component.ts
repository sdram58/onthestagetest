import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Globales} from '../Globales';
import {Texto} from '../Texto';
import { Observable } from 'rxjs';
import { ProcedenciaService } from './../procedencia.service';
import { Localidad } from '../modelo/Localidad';
import { Comunidad } from './../modelo/Comunidad';
import { Pais } from './../modelo/Pais';
import { Provincia } from '../modelo/Provincia';
import { async } from 'q';

@Component({
  selector: 'procedencia',
  templateUrl: './procedencia.component.html',
  styleUrls: ['./procedencia.component.scss']
})
export class ProcedenciaComponent implements OnInit {

  @Output() pais:EventEmitter<Pais> = new EventEmitter<Pais>();
  @Output() localidad:EventEmitter<Localidad> = new EventEmitter<Localidad>();

  private paisSeleccionado:string;
  private comunidadSeleccionada:string;
  private provinciaSeleccionada:string;
  private localidadSeleccionada:number;
  private semaforoComunidades:boolean;

  private localidades:Localidad[];
  private paises:Pais[];
  private provincias:Provincia[];
  private comunidades:Comunidad[];

  constructor(
    private GLOBALES:Globales, 
    private Texto:Texto, 
    private procedenciaService:ProcedenciaService
  ) { }

  ngOnInit() {
    // Obtenemos la localización del usuario
    this.semaforoComunidades = false;
    console.log("Empieza Geolocation");
    this.procedenciaService.getUserLocation().subscribe((res)=>{
      console.log("Acaba Geolocation " + res);
      /* if(res){
        console.log("Envio emiter de pais GLOBAL " + this.GLOBALES.PAIS);
        this.pais.emit(this.GLOBALES.PAIS);
        if (!this.semaforoComunidades){
          this.semaforoComunidades=true;
        }else{
          this.semaforoComunidades=false;
          this.comunidadSeleccionada = '' + this.seleccionarMiComunidad();
          this.cambiarProvincia();          
        }
      } */
      console.log("Empieza comunidades");
      this.procedenciaService.getComunidades()
          .subscribe(
            res => {
              console.log("Acaba comunidades");
              if(res['STATUS']==='OK'){
                this.comunidades = res['DATA'];                        
              }                 
              this.comunidadSeleccionada = '' + this.seleccionarMiComunidad();
              this.cambiarProvincia();                
            
            },
            err => {         
              console.log(err);
            }
        );  
    });


      this.procedenciaService.getPaises()
            .subscribe(
              res => {
                // console.log("paises");
                if(res['STATUS']==='OK'){
                  this.paises = res['DATA'];                        
                }           
                // console.log(this.paises);
                this.paisSeleccionado = this.GLOBALES.PAIS;
                this.seleccionarPais();
                
              },
              err => {         
                console.log(err);
              }
          );
  }//Fin OnInit


  seleccionarMiComunidad():number{
    let menor:number=1000;
    for(let comunidad of this.comunidades){
      let dist:number= this.levenshtein(comunidad.descripcion.toLocaleLowerCase()
      .replace("comunidad", "")
      .replace("comunitat", "")
      .replace("islas", "")
      .replace("isla", "")
      .replace("illa", "")
      .replace("illes", "").trim(), this.GLOBALES.COMUNIDAD_STR.toLocaleLowerCase()
      .replace("comunidad", "")
      .replace("comunitat", "")
      .replace("islas", "")
      .replace("isla", "")
      .replace("illa", "")
      .replace("illes", "").trim());
      console.log("Comunidad " + comunidad.descripcion + " distancia = " + dist + " " +this.GLOBALES.COMUNIDAD_STR);
      if(dist < menor && (comunidad.descripcion.length > (dist + 2) )){
        menor = dist;
        this.GLOBALES.COMUNIDAD = comunidad.id;
      }
      
    }
    return this.GLOBALES.COMUNIDAD;
    
  }

  cambiarProvincia(){
    //console.log(this.comunidadSeleccionada);
    this.localidad.emit(null);
    this.provinciaSeleccionada = '' + -1;
    this.localidadSeleccionada = -1;
    this.procedenciaService.getProvinciasByComunidad('' + this.comunidadSeleccionada)
      .subscribe(
        res => {
          //console.log("provincias de...");
          if(res['STATUS']==='OK'){
            this.provincias = res['DATA'];                        
          }else{
            console.log(res['ERROR']);
          }          
          //console.log(res);
          
        },
        err => {        
          console.log(err);
        }
    );
  }


  cambiarLocalidad(){
    // console.log(this.provinciaSeleccionada);
    this.localidad.emit(null);
    this.localidadSeleccionada = -1;
    this.procedenciaService.getLocalidadesByProvincia('' + this.provinciaSeleccionada)
      .subscribe(
        res => {
          //console.log(res.DATA);
          // console.log("localidades de...");
          if(res['STATUS']==='OK'){
            this.localidades = res['DATA'];
          }           
          // console.log(this.localidades);
          
        },
        err => {         
          console.log(err);
        }
    );
  }

  seleccionarLocalidad(){
    console.log("Envio emiter de localidad " + this.localidadSeleccionada);
    let localidad:Localidad;
    for(let loc of this.localidades){
      if(loc.id == this.localidadSeleccionada){
        localidad = loc;
        break;
      }
    }
    this.localidad.emit(localidad);
  }

  seleccionarPais(){
    console.log("Envio emiter de pais " + this.paisSeleccionado);
    let pais;
    for(let p of this.paises){
      if(p.codigo == this.paisSeleccionado){
        pais = p;
        break;
      }
    }
    this.pais.emit(pais);
  }

  levenshtein(a: string, b: string): number
  {
    const an = a ? a.length : 0;
    const bn = b ? b.length : 0;
    if (an === 0)
    {
      return bn;
    }
    if (bn === 0)
    {
      return an;
    }
    const matrix = new Array<number[]>(bn + 1);
    for (let i = 0; i <= bn; ++i)
    {
      let row = matrix[i] = new Array<number>(an + 1);
      row[0] = i;
    }
    const firstRow = matrix[0];
    for (let j = 1; j <= an; ++j)
    {
      firstRow[j] = j;
    }
    for (let i = 1; i <= bn; ++i)
    {
      for (let j = 1; j <= an; ++j)
      {
        if (b.charAt(i - 1) === a.charAt(j - 1))
        {
          matrix[i][j] = matrix[i - 1][j - 1];
        }
        else
        {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1], // substitution
            matrix[i][j - 1], // insertion
            matrix[i - 1][j] // deletion
          ) + 1;
        }
      }
    }
    return matrix[bn][an];
  };

}
