import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { EventoMin } from 'src/app/modelo/EventoMin';

@Component({
  selector: 'lista-evento',
  templateUrl: './lista-evento.component.html',
  styleUrls: ['./lista-evento.component.scss']
})
export class ListaEventoComponent implements OnInit, AfterViewInit {
  @Input() eventos:Array<EventoMin>
  constructor() { }

  ngOnInit() {
    console.log("Eventos!!!");
    console.log(this.eventos);
  }

  ngAfterViewInit(){
    console.log("Eventos2!!!");
    console.log(this.eventos);
  }

}
