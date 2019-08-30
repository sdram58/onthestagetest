import { Globales } from './../Globales';
import { Localidad } from 'src/app/modelo/Localidad';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogData } from './../simple-dialog/dialog-data';
import { Pais } from '../modelo/Pais';
import {FormControl, FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { Texto } from '../Texto';
import * as $ from 'jquery';
import { LogupService } from '../logup.service';
import { MatDialog } from '@angular/material';
import { LocalNoReg } from '../modelo/Local';
import { SimpleDialogComponent } from '../simple-dialog/simpledialog.component';

@Component({
  selector: 'noreg-local',
  templateUrl: './noreg-local.component.html',
  styleUrls: ['./noreg-local.component.scss']
})
export class NoregLocalComponent implements OnInit {
  @Output() regResult:EventEmitter<LocalNoReg> = new EventEmitter<LocalNoReg>();
  resultadoRegistro:boolean = false;
  submitErrors:string[];
  enviadoForm:boolean=false;
  local:LocalNoReg=null;

  pais:Pais;
  localidad:Localidad;
  vFoto: File = null;

  nombre:FormControl;
  direccion:FormControl;
  latitud:FormControl;
  longitud:FormControl;
  desc_local:FormControl;

  constructor(private Texto:Texto, private GLOBALES:Globales, private signUpService:LogupService,
    private dialog: MatDialog) { 
    this.nombre = new FormControl('',Validators.required);
    this.direccion = new FormControl('',Validators.required);
    this.desc_local = new FormControl('',Validators.required);
    this.latitud = new FormControl('');
    this.longitud = new FormControl('');
  }

  ngOnInit() {

    $(".foto>input").change(function(){
      //console.log(this.files[0]);
      var input = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onloadend = function () {
            //let id= "#div-foto" + $(input).attr('id').slice(-1);
            //console.log(reader.result);
            $('.foto>div').css('background-image', 'url("' + reader.result + '")');
        }

        reader.readAsDataURL(input.files[0]);
      }
    });
    
  }

  getPais(pais:Pais){
    //console.log("Llega emiter de Pais " + pais);
    this.pais = pais;
  }

  getLocalidad(localidad:Localidad){
    //console.log("Llega emiter de Localidad " + localidad);
    this.localidad = localidad;
  }

  /*
  * Método para validar el formulario
  */
  checkValidity():boolean{
    return this.nombre.valid && 
    this.direccion.valid && 
    this.desc_local.valid && 
    ( (this.pais !=null && this.pais.codigo != "ES") || 
      (this.pais !=null && this.pais.codigo == "ES" && this.localidad != null));
  }

  vaciarErrores(){
    this.submitErrors=[];
    this.submitErrors.length = 0;
  }

  /*
  * Método para enviar el formulario
  */
  checkForm(){
    this.enviadoForm = true;
    this.vaciarErrores();
    if(!this.nombre.valid){ 
      this.nombre.errors;
      this.submitErrors.push(this.Texto.i.NOMBRE + ' ' + this.Texto.i.NO_EMPTY.toLowerCase());
    }
    if(!this.direccion.valid){
      this.submitErrors.push(this.Texto.i.DIRECCION + ' ' + this.Texto.i.NO_EMPTY.toLowerCase());

    }
    
    if(!this.desc_local.valid){
      this.submitErrors.push(this.Texto.i.BAD_DESC_LOCAL);
    }
    if(this.pais == null){
      this.submitErrors.push(this.Texto.i.BAD_PAIS);

    }
    if(this.pais != null && this.pais.codigo=='ES' && this.localidad==null){
      this.submitErrors.push(this.Texto.i.BAD_LOCALIDAD);
    }

    if(this.submitErrors.length<=0){//Sin errores Enviamos formulario!      

      this.local = new LocalNoReg();
      this.local.localidad = this.localidad;      
      this.local.latitud = this.latitud.value;
      this.local.longitud = this.longitud.value;
      this.local.direccion = this.direccion.value;
      this.local.descripcion = this.desc_local.value;
      this.local.pais = this.pais;  
      this.local.nlocal = this.nombre.value; 


      console.log(this.local);

      this.signUpService.localNoRegSignUp(this.local,this.vFoto).subscribe((res)=>{
        this.vaciarErrores();
        console.log(res);
        let datos:DialogData;
        if(res==null){
          datos={
            title:this.Texto.i.ARTISTA,
            body:this.Texto.i.CONXION_ERROR,
            yesno:false,
            has_input:false,
            input_value:"",
            name_button_no:"",
            name_button_yes:this.Texto.i.ACEPTAR,
          };
          this.openDialog(datos);
          this.submitErrors.push(this.Texto.i.CONXION_ERROR);
          this.enviadoForm = false;
        }else{
          if(res['res']==true){
            this.resultadoRegistro = true;
            this.local = <LocalNoReg>res['data'];
            datos={
              title:this.Texto.i.LOCAL,
              body:this.Texto.i.REGISTRO_OK_NO_MAIL,
              yesno:false,
              has_input:false,
              input_value:"",
              name_button_no:"",
              name_button_yes:this.Texto.i.ACEPTAR,
            };
            this.openDialog(datos);
          }else{
            this.resultadoRegistro = false;
            datos={
              title:this.Texto.i.LOCAL,
              body:res['data'],
              yesno:false,
              has_input:false,
              input_value:"",
              name_button_no:"",
              name_button_yes:this.Texto.i.ACEPTAR,
            };
            this.openDialog(datos);
          }
        }        
      });     
    }else{
      console.log("Ha habido errores");
    }
  }

  /*
  * Coge la foto y la pone en la variable
  */
 onFileSelected(event){
    this.vFoto = <File>event.target.files[0];
 }

 openDialog(datos?:DialogData){

  if(!datos){
    datos={
      title:this.Texto.i.LOCAL,
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
    backdropClass: 'micalse'
  });

  dialogRef.afterClosed().subscribe(result => {
    if(this.resultadoRegistro){
      this.regResult.emit(this.local);
    }else{
      this.regResult.emit(null);
    }
  });
}

enviarPaisRegistrado(local:LocalNoReg){
  this.regResult.emit(local);
}

}
