import { Component, OnInit } from '@angular/core';
import { Globales } from '../Globales';
import { Texto } from '../Texto';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { EventService } from '../event.service';
import { Evento } from '../modelo/Evento';

@Component({
  selector: 'buscar-eventos',
  templateUrl: './buscar-eventos.component.html',
  styleUrls: ['./buscar-eventos.component.scss']
})
export class BuscarEventosComponent implements OnInit {

  private imgs_destacado:string[];
  private texto1:string[];
  private texto2:string[];
  private eventosDestacados:Evento[];
  
  constructor(
    private loginService:LoginService,
    private eventService:EventService,
    private router:Router,
    private Texto:Texto,
    private GLOBALES:Globales
  ) { 
    
  }

  ngOnInit() {
    this.loginService.validuser().subscribe(
      res=>{
        if(res){
          if(!this.GLOBALES.LOGGED){ //Recordar el por qué || ((this.GLOBALES.SCOPE!=this.GLOBALES.ARTISTA_SCOPE) && (this.GLOBALES.SCOPE==this.GLOBALES.LOCAL_SCOPE))){
            this.router.navigateByUrl('');
          }else{
            this.eventService.getEventosDestacados().subscribe((res)=>{      
              console.log("res",res);
              if(res.res){
                this.eventosDestacados = <Evento[]>res.data;    
                this.imgs_destacado = [];
                this.texto1 = [];            
                this.texto2 = [];            
                for(let i = 0; i<this.eventosDestacados.length;i++){
                  this.imgs_destacado[i] = this.eventosDestacados[i].foto;
                  this.texto1[i] = this.eventosDestacados[i].nombre;
                  this.texto2[i] = "";
                }
              }
            },
            err => {
        
            });
          }
        }else{
          this.router.navigateByUrl('');
        }
      },
      err =>{
        console.log(err);
      }
    );

    
  }

  buscarEvento(){
    this.router.navigateByUrl("buscar");
  }

  getNumImage(event){
    this.router.navigateByUrl("evento/"+ this.eventosDestacados[event].id);
  }

}
