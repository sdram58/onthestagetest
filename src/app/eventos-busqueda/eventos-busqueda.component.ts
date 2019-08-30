import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Globales } from '../Globales';
import { Texto } from '../Texto';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { EventoMin } from '../modelo/EventoMin';

@Component({
  selector: 'app-eventos-busqueda',
  templateUrl: './eventos-busqueda.component.html',
  styleUrls: ['./eventos-busqueda.component.scss']
})
export class EventosBusquedaComponent implements OnInit {

  private arrayEventoMin:Array<EventoMin>;

  private text:string = "hola";
  private color:string = "#FFDD00";

  private bgColorToogle:string;
  private colorToogle:string;

  private eventoCargado:boolean = false;

  constructor(
    private eventService:EventService,
    private router:Router,
    private route:ActivatedRoute,
    private loginService:LoginService,
    private GLOBALES:Globales,
    private texto:Texto
  ) {
    this.bgColorToogle = this.GLOBALES.color
   }

  ngOnInit() {

    this.loginService.validuser().subscribe(
      res=>{
        if(res){
          if(!this.GLOBALES.LOGGED){ //Recordar el por qué || ((this.GLOBALES.SCOPE!=this.GLOBALES.ARTISTA_SCOPE) && (this.GLOBALES.SCOPE==this.GLOBALES.LOCAL_SCOPE))){
            this.router.navigateByUrl('');
          }else{
            let filtro:string=this.GLOBALES.FILTRO_QUERY;
            this.GLOBALES.FILTRO_QUERY = "";
            /* this.route.paramMap
              .subscribe((params) => {
                filtro = params.get('query');
                console.log("filtro2");

                console.log(filtro);

            });
         */
            this.eventService.getEventFiltered(filtro).subscribe(
              (res)=>{
                if(res){
                  if(res.res){
                    console.log(res.data.length);
                    console.log(res);
                    this.arrayEventoMin = new Array<EventoMin>();
                    res.data.forEach(element => {
                      this.arrayEventoMin.push(<EventoMin> element);
                    });
                     this.eventoCargado = true;
                  }
                  else
                  console.log(0);
                }else{
                  console.log("Error1 obteniendo filtrado");
                }
            },
            (err)=>{
              console.log("Error2 obteniendo filtrado");
            }
            );
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

}
