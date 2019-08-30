import { SimpleDialogComponent } from './../simple-dialog/simpledialog.component';
import { DialogData } from './../simple-dialog/dialog-data';
import { Pais } from './../modelo/Pais';
import { Localidad } from './../modelo/Localidad';
import { Local } from './../modelo/Local';
import { Component, OnInit } from '@angular/core';
import {FormControl ,Validators} from '@angular/forms';
import { MispinnerComponent } from '../mispinner/mispinner.component' ;
import {Globales} from '../Globales';
import {Texto} from '../Texto';
import { LogupService } from '../logup.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import * as $ from 'jquery';

import { Router } from '../../../node_modules/@angular/router';

const DefaultInstagram = 'https://www.instagram.com/';
const DefaultFacebook = 'https://www.facebook.com/';
const DefaultTwitter = 'https://twitter.com/';
const DefaultYoutube = 'https://www.youtube.com/';
const DefaultWWW = 'https://www.';

@Component({
  selector: 'app-reg-local',
  templateUrl: './reg-local.component.html',
  styleUrls: ['./reg-local.component.scss']
})
export class RegLocalComponent implements OnInit {
  foto_perfil = new FormControl('');
  vFoto_Perfil: File = null;
  vFoto1: File = null;
  vFoto2: File = null;
  vFoto3: File = null;
  vFoto4: File = null;

  name = new FormControl('', [Validators.required]);
  local_name = new FormControl('',Validators.required);

  direccion = new FormControl('',Validators.required);
  latitud = new FormControl('');
  longitud = new FormControl('');

  email = new FormControl('', [Validators.required, Validators.email]);

  pass = new FormControl('', [Validators.required, Validators.minLength(5)]);
  pass2 = new FormControl('', [Validators.required, Validators.minLength(5)]);
  telf = new FormControl('', [Validators.required,Validators.pattern(
    "^[0-9]{9}$"
  )]);
  instagram = new FormControl(DefaultInstagram,[]);
  twitter = new FormControl(DefaultTwitter, []);
  facebook = new FormControl(DefaultFacebook, []);
  youtube = new FormControl(DefaultYoutube, []);
  www = new FormControl(DefaultWWW, []);

  pais:Pais;
  localidad:Localidad;

  desc_local = new FormControl('',[Validators.required]);
  foto1 = new FormControl('',[]);
  foto2 = new FormControl('',[]);
  foto3 = new FormControl('',[]);
  foto4 = new FormControl('',[]);

  fotos:string[];

  fotosVisible:boolean=false;
  ctecVisible:boolean=false;
  socialVisible:boolean=false;

  enviadoForm:boolean=false;

  
  //Variable que contiene si el formulario es válido
  private submitErrors:string[] = new Array();


  constructor(
    private GLOBALES:Globales, 
    private Texto:Texto,  
    private signUpService:LogupService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {    
    if(this.GLOBALES.LOGGED){
      this.router.navigateByUrl('main');
    }
  

    $(".input-fotos input").change(function(){
      readURL(this);
   });

    $(".foto_per input").change(function(){
      //console.log(this.files[0]);
      var input = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onloadend = function () {
            //let id= "#div-foto" + $(input).attr('id').slice(-1);
            //console.log(reader.result);
            $('.foto_per div').css('background-image', 'url("' + reader.result + '")');
        
        }

        reader.readAsDataURL(input.files[0]);
      }
    });

   function readURL(input) {
   
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onloadend = function () {
            let id= "#div-foto" + $(input).attr('id').slice(-1);
            $(id).css('background-image', 'url("' + reader.result + '")');
        
        }

        reader.readAsDataURL(input.files[0]);
      }
    }
  }

  getErrorMessage(element:FormControl) 
  {
    
    return  element.hasError('required') ? this.Texto.i.NO_EMPTY:
            element.hasError('email') ? this.Texto.i.FORMAT_ERROR_EMAIL:
            element.hasError('minlength') ? this.Texto.i.FORMAT_ERROR_EMAIL:
            element.hasError('maxlength') ? this.Texto.i.FORMAT_ERROR_EMAIL:
            "ERROR";
    
  }

  aceptarSocial(){
    this.socialVisible = false;
  }

  aceptarCTecnicas(){
    this.ctecVisible = false;
  }

  onFileSelectedFP(event){
    this.vFoto_Perfil = <File>event.target.files[0];
    //console.log(this.vFoto_Perfil);
  }
  onFileSelectedFoto1(event){
    this.vFoto1 = <File>event.target.files[0];
  }
  onFileSelectedFoto2(event){
    this.vFoto2 = <File>event.target.files[0];
  }
  onFileSelectedFoto3(event){
    this.vFoto3 = <File>event.target.files[0];
  }
  onFileSelectedFoto4(event){
    this.vFoto4 = <File>event.target.files[0];
  }

  upLoad(){
    const fd = new FormData();
    fd.append('foto_perfil',this.vFoto_Perfil,this.vFoto_Perfil.name);
  }

  getPais(pais:Pais){
    //console.log("Llega emiter de Pais " + pais);
    this.pais = pais;
  }


  getLocalidad(localidad:Localidad){
    //console.log("Llega emiter de Localidad " + localidad);
    this.localidad = localidad;
  }

  checkForm(){
    this.enviadoForm = true;
    this.vaciarErrores();
    if(!this.name.valid){ 
      this.name.errors;
      this.submitErrors.push(this.Texto.i.NOMBRE + ' ' + this.Texto.i.NO_EMPTY.toLowerCase());
    }
    if(!this.local_name.valid){
      this.submitErrors.push(this.Texto.i.LOCAL + ' ' + this.Texto.i.NO_EMPTY.toLowerCase());

    }
    if(!this.email.valid){
      this.submitErrors.push(this.Texto.i.FORMAT_ERROR_EMAIL);
    }

    if(!this.pass.valid){
      this.submitErrors.push(this.Texto.i.BAD_PASS);
    }
    if(!this.pass2.valid){
      this.submitErrors.push(this.Texto.i.BAD_PASS);
    }
    if(this.pass.value != this.pass2.value){
      this.submitErrors.push(this.Texto.i.PASS_MISMATCH);
    }
    if(!this.telf.valid){
      this.submitErrors.push(this.Texto.i.BAD_TELF);
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
      this.www.setValue(this.www.value.toLowerCase().localeCompare(DefaultWWW)!=0?this.www.value:"");
      this.facebook.setValue(this.facebook.value.toLowerCase().localeCompare(DefaultFacebook)!=0?this.facebook.value:"");
      this.instagram.setValue(this.instagram.value.toLowerCase().localeCompare(DefaultInstagram)!=0?this.instagram.value:"");
      this.twitter.setValue(this.twitter.value.toLowerCase().localeCompare(DefaultTwitter)!=0?this.twitter.value:"");
      this.youtube.setValue(this.youtube.value.toLowerCase().localeCompare(DefaultYoutube.toLocaleLowerCase())!=0?this.youtube.value:"");

      let local = new Local();
      local.email = this.email.value;
      local.nombre = this.name.value;
      local.telf = this.telf.value;
      local.m_pass = this.pass.value;
      local.localidad = this.localidad;      
      local.web = this.www.value;
      local.facebook = this.facebook.value;
      local.instagram = this.instagram.value;
      local.twitter = this.twitter.value;
      local.latitud = this.latitud.value;
      local.longitud = this.longitud.value;
      local.direccion = this.direccion.value;
      local.descripcion = this.desc_local.value;
      local.pais = this.pais;  
      local.video = this.youtube.value; 
      local.destacado = false; 
      local.activado = false; 
      local.nlocal = this.local_name.value; 
      local.registrado = false;

      let fotos:File[]= new Array();
      if(this.vFoto1) fotos.push(this.vFoto1);
      if(this.vFoto2) fotos.push(this.vFoto2);
      if(this.vFoto3) fotos.push(this.vFoto3);
      if(this.vFoto4) fotos.push(this.vFoto4);
  

      console.log(local);

      this.signUpService.localSignUp(local,this.vFoto_Perfil,fotos).subscribe((res)=>{
        this.vaciarErrores();
        console.log(res);
        let datos:DialogData;
        switch (res){
          case 'OK':{
            
            datos={
              title:this.Texto.i.LOCAL,
              body:this.Texto.i.REGISTRO_OK,
              yesno:false,
              has_input:false,
              input_value:"",
              name_button_no:"",
              name_button_yes:this.Texto.i.ACEPTAR,
            };
            this.openDialog(datos);
            break;
          }

          case 'KO':{
            
            datos={
              title:this.Texto.i.LOCAL,
              body:this.Texto.i.CONXION_ERROR,
              yesno:false,
              has_input:false,
              input_value:"",
              name_button_no:"",
              name_button_yes:this.Texto.i.ACEPTAR,
            };
            this.openDialog(datos);
            break;
          }

          default:
            datos={
              title:this.Texto.i.LOCAL,
              body:res,
              yesno:false,
              has_input:false,
              input_value:"",
              name_button_no:"",
              name_button_yes:this.Texto.i.ACEPTAR,
            };
          this.openDialog(datos);
            this.submitErrors.push(res);

        }
        this.enviadoForm = false;
      })

       
      
    }else{
      console.log("Ha habido errores");
    }
    
 

  }

  vaciarErrores(){
    this.submitErrors=[];
    this.submitErrors.length = 0;
  }


  checkValidity():boolean{
    return this.name.valid && 
      this.local_name.valid && 
      this.email.valid && 
      this.pass.valid &&
      this.pass2.valid &&
      this.pass.value == this.pass2.value &&
      ((this.pais !=null && this.pais.codigo != "ES") || (this.pais !=null && this.pais.codigo == "ES" && this.localidad != null)) &&
      this.telf.valid && 
      this.desc_local.valid;
  }

  openDialog(datos?:DialogData){

    if(!datos){
      datos={
        title:this.Texto.i.LOCAL,
        body:this.Texto.i.CONXION_ERROR,
        yesno:true,
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
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
