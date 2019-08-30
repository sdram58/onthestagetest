import { Globales } from './../../Globales';
import { EventService } from './../../event.service';
import { Texto } from './../../Texto';
import { Component, OnInit, Input } from '@angular/core';
import { Evento } from 'src/app/modelo/Evento';
import { EventoMin } from 'src/app/modelo/EventoMin';
import { elementProperty } from '@angular/core/src/render3/instructions';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';


@Component({
  selector: 'item-evento',
  templateUrl: './item-evento.component.html',
  styleUrls: ['./item-evento.component.scss']
})
export class ItemEventoComponent implements OnInit {

  @Input() evento:EventoMin;
  @Input() esProximo:boolean; //Si es proximo es cierto, son eventos próximos
  @Input() editable:boolean; //Si aparecen o no los botones
  @Input() artistaLocal:boolean; //Artista true, local false; se muestra como si lo viera un artista

  mes:string;
  dia:string;
  otros:string;

  mostrar:boolean = true; //Se mostrará siempre que no se de a borrar y se borre ok
  borrandoEvento:boolean = false; //Cada vez que se borre un evento muestra el spinner

  constructor(
    private Texto:Texto,
    private eventService: EventService,
    private GLOBALES:Globales,
    private router:Router,

  ) { }

  ngOnInit() {
    let anyo=this.evento.dia.split('-')[2];
    let mes=this.evento.dia.split('-')[1];
    let dia=this.evento.dia.split('-')[0];
    let newFecha = anyo+"-"+mes+"-"+dia;
    this.mes = this.Texto.i.MESES[new Date(newFecha).getMonth()];
    this.dia = dia;
    if(this.esArtista()){
      this.otros = this.evento.local.charAt(0).toUpperCase() + this.evento.local.slice(1).toLocaleLowerCase();
    }
    if(this.esLocal()){
      this.otros = "";
      this.evento.artistas.forEach(element => {
        let relleno:string = "";
        if(this.otros != ""){
          relleno = ", ";
        }
        this.otros += relleno + element.charAt(0).toUpperCase() + element.toLowerCase().slice(1);
      });
    }

  }

  esAutor():boolean{
    return (this.GLOBALES.USUARIO.id == this.evento.autor
      && this.GLOBALES.SCOPE == this.evento.scope_autor);
  }

  esArtista():boolean{
    return this.artistaLocal;
  }
  esLocal():boolean{
    return !this.artistaLocal;
  }

  deleteEvent($event){
    $event.preventDefault();
    this.borrandoEvento = true;
    this.eventService.deleteEventById(this.evento.id).subscribe(res=>{
      this.borrandoEvento = false;
      if(res.res){
        this.mostrar = false;
      }
    });
  }

  editEvent($event){
    $event.preventDefault();
    this.router.navigateByUrl('editarevento/'+this.evento.id);
  }

  showEvent(){
    this.router.navigateByUrl('evento/'+this.evento.id);
  }

}
