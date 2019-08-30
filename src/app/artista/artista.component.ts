import { Component, OnInit } from '@angular/core';
import {  ArtistaService } from '../artista.service';
import { Globales } from '../Globales';
import { Router } from '../../../node_modules/@angular/router';
import {Texto} from '../Texto';
import { StorageService } from '../storage.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent implements OnInit {

  fotoPerfil;
  nombre;
  nartista;
  mVisible:boolean = true;

  constructor(
    private aservice:ArtistaService, 
    private GLOBALES:Globales,
    private router: Router,
    private ss:StorageService,
    private loginService:LoginService,
    private Texto: Texto) { 
      //this.fotoPerfil = this.GLOBALES.LOADING_IMAGE;
    }

  ngOnInit() {
    this.loginService.validuser().subscribe(
      res=>{
        if(res){
          this.aservice.getDatos().subscribe(
            res=>{
              switch(res){
                case "OK":
                  //this.fotoPerfil = "https://onthestage.es/img/nouser.png";
                  this.fotoPerfil = this.GLOBALES.USUARIO.fotoperfil!=null?this.GLOBALES.USUARIO.fotoperfil:this.GLOBALES.NO_USER_IMAGE;
                  this.nombre = (this.GLOBALES.USUARIO.nombre + " " + this.GLOBALES.USUARIO.apellidos).toLocaleUpperCase();
                  this.nartista = this.GLOBALES.USUARIO.nartista.toLocaleUpperCase();
                  break;
                case "KO":{
                  this.router.navigateByUrl('');
                }
      
              }
            },
            err=>{
              console.log(err);
              this.router.navigateByUrl('');
            }
          );
        }else{
          this.router.navigateByUrl('');
        }
      },
      err =>{
        console.log("Error getting artista");
        console.log(err);
      }
    );
    //Compro
    
  }

  addEvent(){
    this.router.navigateByUrl('addEvent');
  }
  misEventos(){
    this.router.navigateByUrl('miseventos');    
  }
  buscarEvento(){
    this.router.navigateByUrl('buscarevento');    
  }
  buscarLocales(){
    this.router.navigateByUrl('buscarlocales');    
  }
  actualizarPerfil(){
    this.router.navigateByUrl('updateperfil');    
  }

}
