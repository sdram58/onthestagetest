import { TipoEvento } from './../modelo/TipoEvento';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Globales} from '../Globales';
import {Texto} from '../Texto';
import { Observable } from 'rxjs';
import { TiposEventoService } from '../tipos-evento.service';


@Component({
  selector: 'tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.scss']
})



export class TipoEventoComponent implements OnInit {

  public eventos:TipoEvento[];
  public musicas:TipoEvento[];

  private tipoEvento:number;
  private tipoEventoMusica:number;

  @Output() mTipoEvento:EventEmitter<TipoEvento> = new EventEmitter<TipoEvento>();

  selectedValue:number;
  selectedValueMusica:number;

  constructor(
    private GLOBALES:Globales, 
    private Texto:Texto, 
    private tiposEventoService:TiposEventoService
  ) { }

  ngOnInit() {
    this.tiposEventoService.getGeneros()
      .subscribe(
        res => {
          console.log("Generos");
          if(res['STATUS']==='OK'){
             this.eventos = res['DATA'];  
             this.mTipoEvento.emit(null);                      
          }           
          console.log(this.eventos);
          
        },
        err => {         
          console.log(err);
        }
    );

    this.tiposEventoService.getMusica()
      .subscribe(
        res => {
          console.log("Músicas");
          if(res['STATUS']==='OK'){
            this.musicas = res['DATA'];                        
          }
          console.log(this.musicas);

        },
        err => {         
          console.log(err);
        }
    );
  }

  log(valor){
    console.log(valor);
  }

  cambiarTipoEvento(){
    let tEvent= new TipoEvento();
    if(this.selectedValue==1){
      tEvent = null;
    }else{
      tEvent = this.eventos.filter((element,index, array)=>{return element.id==this.selectedValue})[0];
    }
    console.log("Tipo Evento Emitter1 ");
    console.log(tEvent);
    this.mTipoEvento.emit(tEvent);
  }

  cambiarTipoEventoMusica(){
    console.log("Ahi va musica"    );
    console.log(this.selectedValueMusica);
    //this.selectedValueMusica = evento.value;
    console.log("Valor música " + this.selectedValueMusica);
    console.log("Tipo Evento Emitter2 ");
    console.log(this.musicas.filter((element,index, array)=>{return element.id==this.selectedValueMusica})[0]);
    this.mTipoEvento.emit(this.musicas.filter((element,index, array)=>{return element.id==this.selectedValueMusica})[0]);
  }

}
