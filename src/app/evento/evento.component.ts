import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service';
import { Globales } from './../Globales';
import { EventService } from '../event.service';
import { Texto } from '../Texto';
import { Evento } from '../modelo/Evento';
import { Artista } from '../modelo/Artista';
import { Local } from '../modelo/Local';
import { DialogData } from '../simple-dialog/dialog-data';
import { SimpleDialogComponent } from '../simple-dialog/simpledialog.component';
import { MatDialog } from '@angular/material';
//import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventoComponent implements OnInit {

  eventoID:string;

  private eventoCargado:boolean = true;
  private evento:Evento;
  private artistas:Artista[];
  private local:Local;  

  constructor(
    private route: ActivatedRoute, 
    private loginService:LoginService,
    private GLOBALES:Globales,
    private Texto:Texto,
    private dialog:MatDialog,
    private eventService:EventService,
    private router:Router) { }

  ngOnInit() {

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

    this.route.paramMap
      .subscribe((params) => {
        let id = +params.get('id'); //Con + si queremos que sea un numero
        //this.eventoID = params.get('id');
        this.eventService.getEventById(id).subscribe(res=>{
          this.eventoCargado = false;
          if(res.res){
            this.evento = <Evento>res.data[0];
            this.artistas = this.evento.artistas;
            this.local = this.evento.local;
          }else{
            let datos:DialogData;
            datos={
              title:this.Texto.i.EVENTO,
              body:res.data[0],
              yesno:false,
              has_input:false,
              input_value:"",
              name_button_no:"",
              name_button_yes:this.Texto.i.ACEPTAR,
            };            
            this.openDialog(datos);
          }          
        },
        err=>{
          this.eventoCargado = false;
          console.log(err);
        });
    });
  }

  openDialog(datos?:DialogData){
    if(!datos){
      datos={
        title:this.Texto.i.EVENTO,
        body:this.Texto.i.CONEXION_ERROR,
        yesno:false,
        has_input:false,
        input_value:"",
        name_button_no:"NO",
        name_button_yes:this.Texto.i.ACEPTAR,
      };
    }
    let dialogRef = this.dialog.open(SimpleDialogComponent, {
      data: datos,
      panelClass: ['custom-modalbox'],
      closeOnNavigation:true,
      backdropClass: 'miclase'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
