import { DateAdapter } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import {Globales} from '../Globales';
import { SimpleDialogComponent } from './../simple-dialog/simpledialog.component';
import { DialogData } from './../simple-dialog/dialog-data';
import { Pais } from './../modelo/Pais';
import { Localidad } from './../modelo/Localidad';
import { TipoEvento } from './../modelo/TipoEvento';
import {Texto} from '../Texto';
import { Artista, ArtistaNoReg } from './../modelo/Artista';
import * as $ from 'jquery';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { StorageService } from '../storage.service';
import { LoginService } from '../login.service';
import { ArtistaMin } from '../modelo/ArtistaMin';
import { MatDialog } from '@angular/material';
import { LocalMin } from '../modelo/LocalMin';
import { LocalNoReg, Local } from '../modelo/Local';
import { ArtistaService } from '../artista.service';
import { LocalService } from '../local.service';
import { Evento } from '../modelo/Evento';

const REG = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss']
})
export class EditarEventoComponent implements OnInit {


  nombre_evento = new FormControl('', [Validators.required]);
  dia = new FormControl('', [Validators.required]);
  hora = new FormControl('20:00', [Validators.required]);
  urlCompra = new FormControl('', [Validators.pattern(REG)]);
  precio = new FormControl('0', [Validators.required]);
  edad_minima = new FormControl('0', [Validators.required]);
  obs_evento = new FormControl('', [Validators.required]);
  desc_evento = new FormControl('', [Validators.required]);
  usuarioBusqueda = new FormControl('', [Validators.required]);

  buscarUsuario:boolean = false;
  addUser:boolean = false;
  selectedUser:any[] = new Array();

  selectedUserName:string[] = new Array();

  mFecha:string=""; // Fecha que se va a enviar
  foto = new FormControl('');
  vFoto: File = null;

  minDate = new Date();

  eventAdded:boolean = false;
  enviadoForm:boolean = true;

  evento:Evento;
  foto_evento:string;
  
  constructor(
    private GLOBALES:Globales,
    private route:ActivatedRoute,
    private EventService: EventService,
    private Texto: Texto,
    private router:Router,
    private ss:StorageService,
    private loginService:LoginService,
    private artistaService:ArtistaService,
    private localService:LocalService,
    private dialog: MatDialog,
    private eventService:EventService,
    private adapter: DateAdapter<any>
  ) { 

    this.selectedUserName.push(Texto.i.SIN_DATOS);
      this.adapter.setLocale(this.GLOBALES.LOCALE);
  }

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
          this.enviadoForm = false;
          if(res.res){
            this.evento = <Evento>res.data[0];
            console.log(this.evento);
            this.nombre_evento.setValue(this.evento.nombre);
            this.precio.setValue(this.evento.precio);
            this.hora.setValue(this.evento.hora);
            this.dia.setValue(this.evento.dia);
            this.cambiarDia(null);
            this.edad_minima.setValue(this.evento.edad_minima);
            this.obs_evento.setValue(this.evento.ofertas);
            this.desc_evento.setValue(this.evento.descripcion);
            this.obs_evento.setValue(this.evento.ofertas);
            this.urlCompra.setValue(this.evento.tickets);
            //$('.foto').css('background-image', 'url("' + this.evento.foto + '")');
            this.foto_evento = this.evento.foto;
            if(this.GLOBALES.SCOPE == this.GLOBALES.ARTISTA_SCOPE){
              let localMin  = new LocalMin();
              let l = this.evento.local;
              localMin.descripcion = l.descripcion;
              localMin.fotoperfil = l.fotoperfil;
              localMin.id = l.id;
              localMin.nlocal = l.nlocal;
              this.getSelectedUser(localMin);
            }else{
              if(this.GLOBALES.SCOPE == this.GLOBALES.LOCAL_SCOPE){
                for(let i = 0; i<this.evento.artistas.length;i++){
                  let artMin = new ArtistaMin();
                  let a = this.evento.artistas[i];
                  artMin.id = a.id;
                  artMin.desc_espectaculo = a.desc_espectaculo;
                  artMin.nartista = a.nartista;
                  artMin.fotoperfil = a.fotoperfil;
                  artMin.localidad = a.localidad.descripcion;
                  this.getSelectedUser(artMin);
                }
              }
            }
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
          this.enviadoForm = false;
          console.log(err);
        });
    });

    let f=new Date();
    let cad=f.getHours()+":"+f.getMinutes()
    this.hora.setValue(cad);
    

    $(".foto input").change(function(){
      var input = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onloadend = function () {
            $('.foto').css('background-image', 'url("' + reader.result + '")');
        
        }

        reader.readAsDataURL(input.files[0]);
      }
    });
  }


  checkValidity(){
    return this.nombre_evento.valid
    && this.dia.valid && this.mFecha != "" && this.mFecha != null
    && this.hora.valid
    && this.edad_minima.valid && (<number>this.edad_minima.value >= 0)
    && this.precio.valid && (<number>this.precio.value >= 0)
    && this.urlCompra.valid
    && this.obs_evento.valid
    && this.desc_evento.valid
    && this.selectedUser.length > 0
  }


  onFileSelected(event){
    this.vFoto = <File>event.target.files[0];
  }

  getSelectedUser(usuario:any){
    //console.log("Llega al fin");
    if(usuario != null){
      switch(this.GLOBALES.SCOPE){
        case (this.GLOBALES.ARTISTA_SCOPE):{ // Viene un local
          let  usr=<LocalMin>usuario;
          this.selectedUserName.shift();
          this.selectedUser.shift();
          this.selectedUser.push(usr);
          this.selectedUserName.push(usr.nlocal);
          break;
        }
        case (this.GLOBALES.LOCAL_SCOPE):{ // Viene un artista
          let usr = <ArtistaMin>usuario;
          if(this.selectedUserName.indexOf(this.Texto.i.SIN_DATOS)==0){
            this.selectedUserName.shift();
          }
          this.selectedUser.push(usr) 
          this.selectedUserName.push(usr.nartista);
          break;
        }
      }
    }
    this.buscarUsuario = false;    
  }

  cambiarDia(event:Event){
    let fecha:Date;
    fecha = new Date(this.dia.value);
    this.mFecha = fecha.getDate()+"/"+ (fecha.getMonth()+1) + "/" + fecha.getFullYear();
  }

  cambiarHora(event:Event){
    console.log(this.hora.value);
  }

  verResultadoRegistro(userNoreg:any){
    this.addUser = false;
    if(userNoreg != null){
      switch(this.GLOBALES.SCOPE){
        case (this.GLOBALES.ARTISTA_SCOPE):{ // Viene un local
          let usr = <LocalNoReg>userNoreg;
          this.selectedUserName.shift();
          this.selectedUser.shift();
          this.selectedUser.push(usr);
          this.selectedUserName.push(usr.nlocal);
          break;
        }
        case (this.GLOBALES.LOCAL_SCOPE):{ // Viene un artista
          let usr = <ArtistaNoReg>userNoreg;
          if(this.selectedUserName.indexOf(this.Texto.i.SIN_DATOS)==0){
            this.selectedUserName.shift();
          }
          this.selectedUser.push(usr);
          this.selectedUserName.push(usr.nartista);
          break;
        }
      }
    }
  }


  eliminarUsr(id:number){
    let mArtist;
    this.selectedUser = this.selectedUser.filter(element => {
      if(id == element.id){
        mArtist = element;
      }
      return element.id != id;
    });
    if(mArtist && mArtist.foto1){//Es no registrado, lo borramos de la BDD
      if(this.isLocalLogged()){
        this.artistaService.deleteNoRegById(id).subscribe(res=>{
          if(res.toUpperCase().localeCompare("OK")==0){
            console.log("Borrado");
          }else{
            console.log(res);
          }
        });
      }else{
        if(this.isArtistaLogged()){
          this.localService.deleteNoRegById(id).subscribe(res=>{
            if(res.toUpperCase().localeCompare("OK")==0){
              console.log("Borrado");
            }else{
              console.log(res);
            }
          });
        }
      }
    }
  }


  
  isArtistaLogged():boolean{
    return this.GLOBALES.SCOPE == this.GLOBALES.ARTISTA_SCOPE;
  }

  isLocalLogged():boolean{
    return this.GLOBALES.SCOPE == this.GLOBALES.LOCAL_SCOPE;
  }

  checkForm(){
    if(this.checkValidity){
      this.enviadoForm = true;
      let evento:Evento = new Evento();
      evento.id = this.evento.id;
      evento.dia = this.mFecha;
      evento.hora = this.hora.value;
      evento.nombre = this.nombre_evento.value;
      evento.ofertas = this.obs_evento.value;
      evento.descripcion = this.desc_evento.value;
      evento.edad_minima = this.edad_minima.value;
      evento.precio = this.precio.value;
      evento.esFavorito = false;
      evento.asistentes = 0;
      evento.tickets = this.urlCompra.value;
      evento.autor = this.GLOBALES.USUARIO.id;
      evento.scope_autor = this.GLOBALES.SCOPE;

      if(this.isLocalLogged()){
        evento.local = this.GLOBALES.USUARIO;
        evento.artistas = this.selectedUser;
      }
      if(this.isArtistaLogged()){
        let artistas:Artista[] = new Array();
        artistas.push(this.GLOBALES.USUARIO)
        evento.artistas = artistas;
        evento.local = this.selectedUser[0];
      }
      this.EventService.updateEvent(evento,this.vFoto).subscribe(res=>{
        this.enviadoForm = false;
        let datos:DialogData;
        if(res){
         this.eventAdded = res.res;
          datos={
            title:this.Texto.i.EVENTO,
            body:res.data,
            yesno:false,
            has_input:false,
            input_value:"",
            name_button_no:"",
            name_button_yes:this.Texto.i.ACEPTAR,
          };
        }else{
          datos={
            title:this.Texto.i.EVENTO,
            body:this.Texto.i.EDITED_EVENT_KO,
            yesno:false,
            has_input:false,
            input_value:"",
            name_button_no:"",
            name_button_yes:this.Texto.i.ACEPTAR,
          };
        }
        
        
        
        this.openDialog(datos);
      });
    }
  }


  openDialog(datos?:DialogData){

    if(!datos){
      datos={
        title:this.Texto.i.ARTISTA,
        body:this.Texto.i.CONXION_ERROR,
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
      if(this.eventAdded)
        this.router.navigateByUrl('');
    });
  }

}
