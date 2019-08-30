import { Component, OnInit, Input, ElementRef,OnChanges, SimpleChanges, ViewChild,AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Globales } from 'src/app/Globales';
import { Texto } from 'src/app/Texto';
import { ArtistaMin } from 'src/app/modelo/ArtistaMin';
import { LocalMin } from 'src/app/modelo/LocalMin';
import * as $ from 'jquery';
import { Localidad } from 'src/app/modelo/Localidad';

const FotoCargando="https://onthestage.es/img/cargando.png";

@Component({
  selector: 'search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('elemento') elemento: ElementRef;
  @ViewChild('foto') foto: ElementRef;
  @Input() usuario:any;
  @Input() indice:number;
  @Input() scope_usuario:number; //Tipo de Usuario que queremos buscar
  @Output() selectedUser:EventEmitter<any> = new EventEmitter<any>();
  @Input() offset:number;
  
  

  mFoto:string=null;
  mNombre:string="";
  mLocalidad:string="";//Lo que va debajo del nombre
  mDescripcion:string="";
  mProvincia:string ="";
  mId:string ="";
  sFoto:string = "";
  mVisible:boolean=true;
  esArtista:boolean;

  constructor(
    private GLOBALES:Globales,
    private Texto:Texto
  ) { this.esArtista = false; }

  ngOnInit() {
    switch(this.scope_usuario){
      case(this.GLOBALES.ARTISTA_SCOPE):{
        this.esArtista = true;
        let artista = <ArtistaMin>this.usuario;
        this.sFoto = artista.fotoperfil;
        this.mDescripcion = artista.desc_espectaculo;
        this.mNombre = artista.nartista;
        this.mLocalidad = artista.localidad;

        this.mId = ""+artista.id;
        break;
      }
      case(this.GLOBALES.LOCAL_SCOPE):{
        let local = <LocalMin>this.usuario;
        this.sFoto = local.fotoperfil;
        this.mDescripcion = local.descripcion;
        this.mNombre = local.nlocal; 
        this.mProvincia = " - " + local.provincia;
        this.mLocalidad = local.localidad;
        this.mId = ""+local.id;
        break;
      }
      case(this.GLOBALES.USER_SCOPE):{
        break;
      }
      default:{
        break;
      }
    }
  }

  ngAfterViewInit() { 
    
    
    if(this.indice<15){
      setTimeout(()=>{
        this.mFoto = this.sFoto;        
      });
     }else{
      setTimeout(()=>{
         this.mFoto = FotoCargando;
      });
     }
}

  enviarEmitter(){
    //console.log("search-item envia usuario");
    let usr:any = this.usuario;
    this.selectedUser.emit(usr);
    //console.log(usr);
  }

  ngOnChanges(change:SimpleChanges){
    if(change.offset && change.offset.currentValue){
      let vElemento = this.elemento.nativeElement;
      let alturaElemento = $(vElemento).height()+5;
      if(alturaElemento>0){
        if(this.isInViewPort(this.indice,alturaElemento,change.offset.currentValue.a,change.offset.currentValue.o)){    
          this.mFoto = this.sFoto;
         }else{
           //this.mFoto = FotoCargando;
         }
      }
      
    }
      
  }

  isInViewPort(indice:number, miAltura, alturaLista:number, desp:number):boolean{
    if(miAltura<0) return false;
    let cantidadItems = Math.floor(alturaLista/miAltura)+1;
    let itemInicial = Math.floor(desp/miAltura);
    let itemFinal = itemInicial + cantidadItems;
    
    return (itemInicial <= indice  && indice <= itemFinal);

  }
}
