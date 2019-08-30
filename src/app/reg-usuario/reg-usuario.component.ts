import { SimpleDialogComponent } from './../simple-dialog/simpledialog.component';
import { DialogData } from './../simple-dialog/dialog-data';
import { Usuario } from '../modelo/Usuario';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { MispinnerComponent } from '../mispinner/mispinner.component' ;
import {Globales} from '../Globales';
import {Texto} from '../Texto';
import { LogupService } from '../logup.service';
import { Router } from '../../../node_modules/@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {MatDatepicker} from '@angular/material';
import * as $ from 'jquery';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
  selector: 'app-reg-usuario',
  templateUrl: './reg-usuario.component.html',
  styleUrls: ['./reg-usuario.component.scss']
})
export class RegUsuarioComponent implements OnInit {

  foto_perfil = new FormControl('');
  vFoto_Perfil: File = null;

  name = new FormControl('', [Validators.required]);
  apellidos = new FormControl('',Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required, Validators.minLength(5)]);
  pass2 = new FormControl('', [Validators.required, Validators.minLength(5)]);
  fecha:string = "";

  private registradoOk:boolean = false;




  enviadoForm:boolean=false;

  maxDate:Date = new Date((new Date()).getFullYear()-12,(new Date()).getMonth(),(new Date()).getDay());

  
  //Variable que contiene si el formulario es válido
  private submitErrors:string[] = new Array();


  constructor(
    private GLOBALES:Globales, 
    private Texto:Texto, 
    private fb:FormBuilder, 
    private signUpService:LogupService,
    private router: Router,
    private dialog: MatDialog,
    private adapter: DateAdapter<any>
  ) {
    this.adapter.setLocale(this.GLOBALES.LOCALE);
  }

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

  cambiarFecha(evento){
    console.log("·Entra en cambiar fecha");
    console.log(evento)
    this.fecha=evento.value;
  }

  getErrorMessage(element:FormControl) 
  {
    
    return  element.hasError('required') ? this.Texto.i.NO_EMPTY:
            element.hasError('email') ? this.Texto.i.FORMAT_ERROR_EMAIL:
            element.hasError('minlength') ? this.Texto.i.FORMAT_ERROR_EMAIL:
            element.hasError('maxlength') ? this.Texto.i.FORMAT_ERROR_EMAIL:
            "ERROR";
    
  }

  onFileSelectedFP(event){
    this.vFoto_Perfil = <File>event.target.files[0];
    //console.log(this.vFoto_Perfil);
  }


  upLoad(){
    const fd = new FormData();
    fd.append('foto_perfil',this.vFoto_Perfil,this.vFoto_Perfil.name);
  }

  checkForm(){
    this.enviadoForm = true;
    this.vaciarErrores();
    if(!this.name.valid){ 
      this.name.errors;
      this.submitErrors.push(this.Texto.i.NOMBRE + ' ' + this.Texto.i.NO_EMPTY.toLowerCase());
    }
    if(!this.apellidos.valid){
      this.submitErrors.push(this.Texto.i.APELLIDOS + ' ' + this.Texto.i.NO_EMPTY.toLowerCase());

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
    if(this.fecha == ""){
      this.submitErrors.push(this.Texto.i.BAD_FNAC);
    }   
   
    if(this.submitErrors.length<=0){//Sin errores Enviamos formulario!
      
      let usuario = new Usuario();
      usuario.email = this.email.value;
      usuario.nombre = this.name.value;
      usuario.apellidos = this.apellidos.value;
      usuario.password = this.pass.value;
      usuario.fnac = this.fecha;      
      
      usuario.activado = false; 
      usuario.premium = false; 
      usuario.registrado = true;      

      this.signUpService.userSignUp(usuario,this.vFoto_Perfil).subscribe((res)=>{
        this.vaciarErrores();
        console.log(res);
        let datos:DialogData;
        switch (res){
          case 'OK':{
            
            datos={
              title:this.Texto.i.USUARIO,
              body:this.Texto.i.REGISTRO_OK,
              yesno:false,
              has_input:false,
              input_value:"",
              name_button_no:"",
              name_button_yes:this.Texto.i.ACEPTAR,
            };
            this.registradoOk = true;
            this.openDialog(datos);
            break;
          }

          case 'KO':{
            
            datos={
              title:this.Texto.i.USUARIO,
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
      this.enviadoForm = false;
      console.log("Ha habido errores");
    }
    
 

  }

  vaciarErrores(){
    this.submitErrors=[];
    this.submitErrors.length = 0;
  }


  checkValidity():boolean{
    //console.log(this.fecha)
    return this.name.valid && 
      this.apellidos.valid && 
      this.email.valid && 
      this.pass.valid &&
      this.pass2.valid &&
      this.pass.value == this.pass2.value &&
      (this.fecha != "");
  }

  openDialog(datos?:DialogData){

    if(!datos){
      datos={
        title:this.Texto.i.USUARIO,
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
      backdropClass: 'miclase'
    });

    dialogRef.afterClosed().subscribe(result => {
      //result YES si hemos pulsado aceptar
      if(this.registradoOk)
        this.router.navigateByUrl("");
    });
  }

}
