import { Component, OnInit } from '@angular/core';
import { Globales } from '../Globales';
import { Texto } from '../Texto';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { EventoMin } from '../modelo/EventoMin';
import { EventService } from '../event.service';


@Component({
  selector: 'mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.scss']
})
export class MisEventosComponent implements OnInit {

  private eventos_anteriores:EventoMin[];
  private eventos_proximos:EventoMin[];

  recibiendoEventos:boolean;
  recibidosAnteriores:boolean;
  recibidosProximos:boolean;

  constructor(
    private loginService:LoginService,
    private router:Router,
    private Texto:Texto,
    private GLOBALES:Globales,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.recibiendoEventos = true;
    this.recibidosAnteriores = false;
    this.recibidosProximos = false;
    this.loginService.validuser().subscribe(
      res=>{
        if(res){
          if(!this.GLOBALES.LOGGED){ //Recordar el por qué || ((this.GLOBALES.SCOPE!=this.GLOBALES.ARTISTA_SCOPE) && (this.GLOBALES.SCOPE==this.GLOBALES.LOCAL_SCOPE))){
            this.router.navigateByUrl('');
          }
        }else{
          this.router.navigateByUrl('');
        }
      },
      err =>{
        console.log(err);
      }
    );
    //pedimos los proximos
    this.eventService.getMisEventos(true).subscribe(res=>{
      this.recibidosProximos = true;
      this.recibiendoEventos = !(this.recibidosAnteriores && this.recibidosProximos);
      if(res.res){
        this.eventos_proximos = <EventoMin[]>res.data;
      }
    });

    //pedimos los anteriores
    this.eventService.getMisEventos(false).subscribe(res=>{
      this.recibidosAnteriores = true;
      this.recibiendoEventos = !(this.recibidosAnteriores && this.recibidosProximos);
      if(res.res){
        this.eventos_anteriores = <EventoMin[]>res.data;
      }
    });
  }

  esLocal():boolean{
    return this.GLOBALES.SCOPE==this.GLOBALES.LOCAL_SCOPE;
  }
  esArtista():boolean{
    return this.GLOBALES.SCOPE==this.GLOBALES.ARTISTA_SCOPE;
  }
}