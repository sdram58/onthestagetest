import { Component, OnInit, Input,OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Evento } from 'src/app/modelo/Evento';
import { Texto } from 'src/app/Texto';
import { Globales } from 'src/app/Globales';
import { EventService } from 'src/app/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.scss']
})
export class DetalleEventoComponent implements OnInit, OnChanges {

  @Input() evento:Evento;

  constructor(
    private Texto:Texto,
    private GLOBALES:Globales,
    private eventService: EventService,
    private router:Router
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const c_evento: SimpleChange = changes.evento;
    let evento:Evento = <Evento>c_evento.currentValue;
    if(evento){
      this.evento = evento;
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

}
