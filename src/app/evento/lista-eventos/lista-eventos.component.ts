import { Component, OnInit } from '@angular/core';
import { Globales } from '../../Globales';
import { Texto } from '../../Texto';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login.service';
import { EventoMin } from '../../modelo/EventoMin';
import { EventService } from '../../event.service';
import { ArtistaService } from 'src/app/artista.service';
import { LocalService } from 'src/app/local.service';
import { Artista } from 'src/app/modelo/Artista';
import { Local } from 'src/app/modelo/Local';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss']
})
export class ListaEventosComponent implements OnInit {

  private eventos_anteriores:EventoMin[];
  private eventos_proximos:EventoMin[];

  recibiendoEventos:boolean;
  recibidosAnteriores:boolean;
  recibidosProximos:boolean;

  private nombre:string = "";

  private idUser:number;
  private tipoUser:number;

  private conAnteriores:boolean = false; //Por defecto no se muestran los anteriores

  constructor(
    private loginService:LoginService,
    private route:ActivatedRoute,
    private router:Router,
    private Texto:Texto,
    private GLOBALES:Globales,
    private eventService: EventService,
    private artistaService: ArtistaService,
    private localService: LocalService,
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
    
    this.route.paramMap
      .subscribe((params) => {
        this.idUser = +params.get('idusr');
        this.tipoUser = +params.get('tipousr');
        this.conAnteriores = (+params.get('anteriores')==1);

        if(!this.conAnteriores) this.recibidosAnteriores = true;
        //pedimos los proximos
        this.eventService.getEventosDeUsuario(this.tipoUser, this.idUser,true).subscribe(res=>{
          this.recibidosProximos = true;
          this.recibiendoEventos = !(this.recibidosAnteriores && this.recibidosProximos);
          if(res.res){
            this.eventos_proximos = <EventoMin[]>res.data;
          }
        });

        if(this.conAnteriores){
          //pedimos los anteriores
          this.eventService.getEventosDeUsuario(this.tipoUser, this.idUser,false).subscribe(res=>{
            this.recibidosAnteriores = true;
            this.recibiendoEventos = !(this.recibidosAnteriores && this.recibidosProximos);
            if(res.res){
              this.eventos_anteriores = <EventoMin[]>res.data;
            }
          });
        }
        if(this.tipoUser == this.GLOBALES.ARTISTA_SCOPE){
          this.artistaService.getArtistaById(this.idUser).subscribe(
            (res)=>{
              console.log(res);
              let artista:Artista = res.data[0];
              this.nombre = artista.nartista;
            },
            (err)=>{
              console.log(err);
            }
          );
        }else if(this.tipoUser == this.GLOBALES.LOCAL_SCOPE){
          this.localService.getLocalById(this.idUser).subscribe(
            (res)=>{
              let local:Local = res.data[0];
              this.nombre = local.nlocal;
            },
            (err)=>{
              console.log(err);
            }
          );
        }
    });
    

  }

  esLocal():boolean{
    return this.tipoUser==this.GLOBALES.LOCAL_SCOPE;
  }
  esArtista():boolean{
    return this.tipoUser==this.GLOBALES.ARTISTA_SCOPE;
  }

}
