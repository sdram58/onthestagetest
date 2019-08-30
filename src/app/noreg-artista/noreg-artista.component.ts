import { Globales } from './../Globales';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogData } from './../simple-dialog/dialog-data';
import {FormControl, FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { Texto } from '../Texto';
import * as $ from 'jquery';
import { LogupService } from '../logup.service';
import { MatDialog } from '@angular/material';
import { ArtistaNoReg } from '../modelo/Artista';
import { SimpleDialogComponent } from '../simple-dialog/simpledialog.component';
import { TipoEvento } from '../modelo/TipoEvento';

@Component({
  selector: 'noreg-artista',
  templateUrl: './noreg-artista.component.html',
  styleUrls: ['./noreg-artista.component.scss']
})
export class NoregArtistaComponent implements OnInit {

  @Output() regResult:EventEmitter<ArtistaNoReg> = new EventEmitter<ArtistaNoReg>();
  resultadoRegistro:boolean = false;
  submitErrors:string[];
  enviadoForm:boolean=false;
  artista:ArtistaNoReg=null;
  vFoto: File = null;

  nombre:FormControl;
  desc_artista:FormControl;

  tipoEvento:TipoEvento=null;

  constructor(private Texto:Texto, private GLOBALES:Globales, private signUpService:LogupService,
    private dialog: MatDialog) { 
    this.nombre = new FormControl('',Validators.required);
    this.desc_artista = new FormControl('',Validators.required);
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

  /*
  * Método para validar el formulario
  */
  checkValidity():boolean{
    return this.nombre.valid && 
    this.desc_artista.valid && this.tipoEvento!=null;
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
    
    if(!this.desc_artista.valid){
      this.submitErrors.push(this.Texto.i.BAD_DESC_ARTISTA);
    }

    if(this.tipoEvento == null){
      this.submitErrors.push(this.Texto.i.BAD_TIPO_EVENT);
    }

    if(this.submitErrors.length<=0){//Sin errores Enviamos formulario!      

      this.artista = new ArtistaNoReg();
      this.artista.nartista = this.nombre.value;      
      this.artista.desc_espectaculo = this.desc_artista.value;
      this.artista.tipo_espectaculo = this.tipoEvento;

      console.log(this.artista);

      this.signUpService.artistaNoRegSignUp(this.artista, this.vFoto).subscribe((res)=>{
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
            this.artista = <ArtistaNoReg>res['data'];
            datos={
              title:this.Texto.i.ARTISTA,
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
              title:this.Texto.i.ARTISTA,
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
    if(this.resultadoRegistro){
      this.regResult.emit(this.artista);
    }else{
      this.regResult.emit(null);
    }
  });
}

/* enviarPaisRegistrado(artista:ArtistaNoReg){
  this.regResult.emit(artista);
} */

getTipoEvento(tipoEvento:TipoEvento){
  this.tipoEvento = tipoEvento;
}

}
