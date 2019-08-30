import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Globales } from 'src/app/Globales';
import { Artista } from 'src/app/modelo/Artista';
import { Local } from 'src/app/modelo/Local';
import { Texto } from 'src/app/Texto';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { TiposEventoService } from 'src/app/tipos-evento.service';
import { TipoEvento } from 'src/app/modelo/TipoEvento';
import { EventService } from 'src/app/event.service';
import {FormControl, Validators} from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { MatRadioGroup, MatRadioButton } from '@angular/material';

@Component({
  selector: 'buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})

export class BuscarComponent implements OnInit, AfterViewInit {

  @ViewChild('cuandoRadioId') cuandoRadioGroupId:MatRadioGroup;
  @ViewChild('precioRadioId') precioRadioGroupId:MatRadioGroup;

  private generos:TipoEvento[];
  private musica:TipoEvento[];
  private selectedLiveMusic:boolean;
  private num_encontrados:number = 0;

  private buscarLocal:boolean = false;
  private buscarArtista:boolean = false;

  private te:number=7;

  //Variables filtro
  private when:string="";
  private what:string="";
  private whats:Array<number> = new Array<number>();
  private precio:string="";
  
  //para DatePicker
  minDate = new Date();
  dia = new FormControl('', [Validators.required]);

  constructor(
    private GLOBALES:Globales,
    private Texto:Texto,
    private router:Router,
    private loginService:LoginService,
    private eventService: EventService,
    private tiposEventoService:TiposEventoService,
    private adapter: DateAdapter<any>) {
     // this.selectedUserName.push(Texto.i.SIN_DATOS);
      this.adapter.setLocale(this.GLOBALES.LOCALE);
     // this.dia.setValue(new Date());
      //this.mFecha = this.minDate.getDate()+"/"+ (this.minDate.getMonth()+1) + "/" + this.minDate.getFullYear();
     // let f=new Date();
     // let cad=f.getHours()+":"+f.getMinutes()
     // this.hora.setValue(cad);
  }

  ngOnInit() {
    this.selectedLiveMusic = false;
    this.loginService.validuser().subscribe(
      res=>{
        if(res){
          if(!this.GLOBALES.LOGGED){ //Recordar el por qué || ((this.GLOBALES.SCOPE!=this.GLOBALES.ARTISTA_SCOPE) && (this.GLOBALES.SCOPE==this.GLOBALES.LOCAL_SCOPE))){
            this.router.navigateByUrl('');
          }else{
            this.tiposEventoService.getGeneros().subscribe(
              res=>{
                console.log(res);
                this.generos = res['DATA'];
              },
              err=>{
                console.log(err);
              }
            );

            this.tiposEventoService.getMusica().subscribe(
              res=>{
                console.log(res);
                this.musica = res['DATA'];

                //Ponemos valores por defecto
                //this.cuandoRadioId.setValue(1);
                //this.precioRadioId.setValue(1);

                this.getElementoFiltrado();
              },
              err=>{
                console.log(err);
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

  ngAfterViewInit(){   
    console.log(this.precioRadioGroupId);
  }

  verArtistas(){
    console.log("Ver artistas");
  }

  verLocales(){
    console.log("Ver Locales");
  }

  

  checkQueClick(num_select:number){    
    if(num_select == 1){
      this.selectedLiveMusic = !this.selectedLiveMusic;

      //Si estaba marcado desmarcar todas las superiores a 100...
      if(this.whats.indexOf(num_select)!= -1){        
        let i=0;
        while(i<this.whats.length){
          if(this.whats[i]>=100){
            this.whats.splice(this.whats.indexOf(i),1);
          }else{
            i++;
          }
        }          
      }
   }
   if(this.whats.indexOf(num_select)!= -1){
    this.whats.splice(this.whats.indexOf(num_select),1);
   }else{
     this.whats.push(num_select);
   }

   if(this.whats.length<=0){
     this.what = "";    
   }else{
     this.what = "what=";
     this.whats.forEach(element => {
       this.what += element + this.GLOBALES.SEPARATOR_URL;
     });
     this.what = this.what.substr(0,this.what.length - 2);
   }

   this.getElementoFiltrado();
   
  }

 
  radioPrecioClick(mPrecio:number){
    if(mPrecio == 1 || null || undefined || isNaN(mPrecio)){
      this.precio = "";
    }else{
      this.precio = "precio="+mPrecio;
    }
    this.getElementoFiltrado();
  }

  radioCuandoClick(mCuando:number){
    if(mCuando == 1 || null || undefined || isNaN(mCuando)){
      this.when = "";
    }else{
      let fecha = new Date();
      
      fecha = this.GLOBALES.dateAddDays(fecha,mCuando);
      let mes = (fecha.getMonth() + 1).toLocaleString().length==1?"0" + (fecha.getMonth() + 1):""+(fecha.getMonth() + 1);
      let dia = fecha.getDate().toLocaleString().length==1?"0" + (fecha.getDate()):""+(fecha.getDate());

      this.when = "when=" + fecha.getFullYear() + "-" + mes + "-" + dia + ";;0";
    }
  
    //this.dia.setValue("");

    this.getElementoFiltrado();
  }

  cambiarDia(event:Event){
    let fecha:Date;
    console.log("EVENTO");
    console.log(event);
    
    fecha = new Date(this.dia.value);
    let mes = (fecha.getMonth() + 1).toLocaleString().length==1?"0" + (fecha.getMonth() + 1):""+(fecha.getMonth() + 1);
    let dia = fecha.getDate().toLocaleString().length==1?"0" + (fecha.getDate()):""+(fecha.getDate());
    let sFecha = fecha.getFullYear() + "-" + mes + "-" + dia;
    //this.dia.setValue(this.GLOBALES.formatearFecha(sFecha));
    this.when = "when=" +  sFecha + ";;1";
    this.getElementoFiltrado();
  }


  getSelectedUser(usuario:any){
     if(usuario != null){
      console.log(usuario);
      if(this.buscarArtista) {
        this.router.navigateByUrl('listaevento/'+<Artista> usuario.id+"/"+this.GLOBALES.ARTISTA_SCOPE+"/0");
      }else if(this.buscarLocal){
        this.router.navigateByUrl('listaevento/'+<Local> usuario.id+"/"+this.GLOBALES.LOCAL_SCOPE+"/0");
      }
    } 
    this.buscarArtista = false;    
    this.buscarLocal = false;    
  }

  private getFiltro():string{
    let filtro:string = "";
    if(this.what!="") filtro += this.what;
    if(this.when!=""){
      if(filtro!="") filtro += "&" + this.when;
      else filtro += this.when;
    }
    if(this.precio!=""){
      if(filtro!="") filtro += "&" + this.precio;
      else filtro += this.precio;
    }
    console.log("filtro");
    console.log(filtro);
    return filtro;
  }

  getElementoFiltrado(){// filtrado URL evento/getfiltered?what=10;;5;;8;;&when=2019-08-22;;1&precio=0
  //when 1 --> dia exacto
  //when 0 --> hasta ese dia, ese dia o menos
  
    let filtro:string = this.getFiltro();

    this.eventService.getEventFiltered(filtro).subscribe(
      (res)=>{
        if(res){
          if(res.res){
            this.num_encontrados = res.data.length;
            console.log(res);
          }
          else
          this.num_encontrados = 0;
        }else{
          console.log("Error1 obteniendo filtrado");
        }
    },
    (err)=>{
      console.log("Error2 obteniendo filtrado");
    }
    );
  }


  verEventos(){
    if(this.num_encontrados>0){
      this.GLOBALES.FILTRO_QUERY =  this.getFiltro();
      this.router.navigateByUrl('eventosbusqueda');
    }

      
  }
}
