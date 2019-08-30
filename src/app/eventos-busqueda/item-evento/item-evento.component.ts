import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { EventoMin } from 'src/app/modelo/EventoMin';
import { Router } from '@angular/router';
import { Globales } from 'src/app/Globales';
import { Texto } from 'src/app/Texto';
import { EventService } from 'src/app/event.service';
import { Evento } from 'src/app/modelo/Evento';
import { Artista } from 'src/app/modelo/Artista';
import { TiposEventoService } from 'src/app/tipos-evento.service';
import { normalizeKeyframes } from '@angular/animations/browser/src/render/shared';

@Component({
  selector: 'item-evento-busqueda',
  templateUrl: './item-evento.component.html',
  styleUrls: ['./item-evento.component.scss']
})
export class ItemEventoBusquedaComponent implements OnInit {

  @Input() eventomin:EventoMin;

  private tamanyoCabecera:string = "1.3em";
  private distancia:string = "120m";
  private tipoEvento:string = "";


  private artistas:string = "";
  private tickets:string = "";
  private telefono:string = "";
  private asistira:boolean = false;
  private esFavorito:boolean = false;

  private cargandoEvento:boolean = true;

  private evento:Evento;

  constructor(
    private Texto:Texto,
    private GLOBALES:Globales,
    private eventService: EventService,
    private router:Router,
    private texto:Texto,
    private tiposEventoService: TiposEventoService
  ) {    
    this.evento= new Evento();
  }

  ngOnInit() {

    if(!this.eventomin){

    }else{
      
      this.eventService.getEventById(this.eventomin.id).subscribe(
        (res)=>{
          if(res){
            if(res.res){
              this.evento = <Evento> res.data[0];

              /*Detectar tipo evento Si todos >= 100 música en directo*/
              
              if(this.evento.tipo.length>1){
                let iguales:boolean = true;
                let esMusicaDirecto:boolean = true;
                let ultimoTipo:string = ""
                let primero:number= -1;
                this.evento.tipo.forEach(element => {
                  if(primero == -1){
                    primero = element.id;
                  }
                  if(primero != element.id){          
                    iguales = false;
                  }
                  if(element.id < 100) esMusicaDirecto = false;
                  ultimoTipo = element.descripcion;
                });
                if(iguales) this.tipoEvento = ultimoTipo;
                else if(esMusicaDirecto) this.tipoEvento = this.texto.i.LIVE_MUSIC;
                else this.tipoEvento = this.texto.i.VARIOS;                
              }else{
                this.tipoEvento = this.evento.tipo[0].descripcion;
              }
              this.artistas = this.getListadoArtista();
              this.cargandoEvento = false;
            }
            else
            console.log(0);
          }else{
            console.log("Error1 obteniendo eventoPorId");
          }
      },
      (err)=>{
        console.log("Error2 obteniendo eventoPorId");
      });
    }
    
  }

  ngOnChanges(changes: SimpleChanges) {
    const c_evento: SimpleChange = changes.evento;
    if(c_evento){
      let evento:Evento = <Evento>c_evento.currentValue;
      if(evento){
        this.evento = evento;
        this.tickets = this.evento.tickets;
        this.artistas = this.getListadoArtista();
        this.asistira = this.evento.asistira;
        this.esFavorito = this.evento.esFavorito;
        this.telefono = this.evento.local.telf;
        //this.tipoEvento = this.evento.tipo.descripcion;
      }
    }
    
  }

  ticketsPressed(){
    if(this.evento.tickets)
      window.open(this.evento.tickets);
  }

  navegarPressed(){
    window.open("https://www.google.com/maps/search/?api=1&query="+ this.evento.local.nlocal.replace(" ","+")+"+"+this.evento.local.localidad.descripcion+"+"+this.evento.local.direccion);
    //window.open('https://www.google.com/maps/place/'+this.evento.local.nlocal.replace(" ","+")+'/@'+this.evento.local.latitud+','+this.evento.local.longitud+',17z');
  }

  asistirPressed(){
    this.eventService.setAsistire(this.evento.id,!this.evento.asistira).subscribe((res)=>{
      if(res>=0){
        this.evento.asistira = !this.evento.asistira;
        this.evento.asistentes = res;
      }
    },
    (err)=>{

    });
  }

  favoritoPressed(){
    this.eventService.setFavorito(this.evento.id,0,!this.evento.esFavorito).subscribe((res)=>{
      if(res>=0){
        this.evento.esFavorito = !this.evento.esFavorito;
        this.evento.numFavoritos = res;
      }
    },
    (err)=>{

    });
  }

  getListadoArtista():string{    
    let mArtistas:string = "";
    this.eventomin.artistas.forEach(element => {
      mArtistas += element + ", ";
    });
    mArtistas = mArtistas.substring(0,mArtistas.length - 2);
    if(mArtistas.length>30){
      if(this.eventomin.artistas.length == 1)
        mArtistas = mArtistas.substr(0, 30) +"...";
      else
        mArtistas = this.texto.i.NUM_PARTICIPANTES + ": " + this.eventomin.artistas.length;
    }
    return mArtistas.toUpperCase();        
  }

  iraEvento(){
    this.router.navigateByUrl("evento/"+ this.eventomin.id);
  }
  
  



}
