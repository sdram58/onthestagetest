import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Local } from '../../modelo/Local';
import { Texto } from 'src/app/Texto';
import { Globales } from 'src/app/Globales';
import { EventService } from 'src/app/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'detalle-local',
  templateUrl: './detalle-local.component.html',
  styleUrls: ['./detalle-local.component.scss']
})
export class DetalleLocalComponent implements OnInit {

  @Input() local:Local;

  private imagenes:string[];
  private texto1:string[];
  private texto2:string[];

  private numFavoritos:number;

  constructor(
    private Texto:Texto,
    private GLOBALES:Globales,
    private eventService: EventService,
    private router:Router
  ) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    const local: SimpleChange = changes.local;
    let mlocal:Local = <Local>local.currentValue;
    if(mlocal){
      this.eventService.getNumFavoritos(this.local.id, this.GLOBALES.LOCAL_SCOPE).subscribe(
        res => {
          if(res >= 0){
            this.numFavoritos = res;
          }
        }
      );
      this.imagenes = new Array();
      this.texto1 = [];
      this.texto1.length = 0;
      this.texto2 = [];
      this.texto2.length = 0;
      if(mlocal.foto1!=""){
        this.imagenes.push(mlocal.foto1);
      }
      if(mlocal.foto2!=""){
        this.imagenes.push(mlocal.foto2);
      }
      if(mlocal.foto3!=""){
        this.imagenes.push(mlocal.foto3);
      }
      if(mlocal.foto4!=""){
        this.imagenes.push(mlocal.foto4);
      }
        
      for(let j=0;j<this.imagenes.length;j++){
        //this.texto1.push(mlocal.nlocal);
       // this.texto2.push(mlocal.localidad.descripcion);
      }
    }
    
  }

  webPressed(){
    if(this.local.web)
      window.open(this.local.web);  
  }

  youtubePressed(){
    if(this.local.video)
      window.open(this.local.video);  
  }

  facebookPressed(){
    if(this.local.facebook)
      window.open(this.local.facebook);  
  }

  instagramPressed(){
    if(this.local.instagram)
      window.open(this.local.instagram);  
  }

  twitterPressed(){
    if(this.local.twitter)
      window.open(this.local.twitter);  
  }

  navegarPressed(){
    window.open('https://www.google.com/maps/place/'+this.local.nlocal.replace(" ","+")+'/@'+this.local.latitud+','+this.local.longitud+',17z');
  }


  favoritoPressed(idArtista){
    this.eventService.setFavorito(this.local.id,this.GLOBALES.LOCAL_SCOPE,!this.local.esFavorito).subscribe((res)=>{
      if(res>=0){
        this.local.esFavorito = !this.local.esFavorito;
        this.numFavoritos = res;
      }
    },
    (err)=>{

    });   
   
  }

  irAHistorial(){
    this.router.navigateByUrl("listaevento/" + this.local.id +"/"+this.GLOBALES.LOCAL_SCOPE +"/1");
   }

}
