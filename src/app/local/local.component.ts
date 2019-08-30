import { Component, OnInit } from '@angular/core';
import {  LocalService } from '../local.service';
import { Globales } from '../Globales';
import { Router } from '../../../node_modules/@angular/router';
import {Texto} from '../Texto';
import { StorageService } from '../storage.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {

  fotoPerfil;
  nombre;
  nlocal;
  mVisible:boolean = true;

  constructor(
    private lservice:LocalService, 
    private GLOBALES:Globales,
    private router: Router,
    private ss:StorageService,
    private loginService:LoginService,
    private Texto: Texto
  ) { }

  ngOnInit() {
    this.loginService.validuser().subscribe(
      res=>{
        if(res){
          this.lservice.getDatos().subscribe(
            res=>{
              switch(res){
                case "OK":
                  //this.fotoPerfil = "https://onthestage.es/img/nouser.png";
                  this.fotoPerfil = this.GLOBALES.USUARIO.fotoperfil!=null?this.GLOBALES.USUARIO.fotoperfil:this.GLOBALES.NO_USER_IMAGE;
                  this.nombre = (this.GLOBALES.USUARIO.nombre + " " + this.GLOBALES.USUARIO.apellidos).toLocaleUpperCase();
                  this.nlocal = this.GLOBALES.USUARIO.nlocal.toLocaleUpperCase();
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
  buscarArtistas(){
    this.router.navigateByUrl('buscarartistas');    
  }
  actualizarPerfil(){
    this.router.navigateByUrl('updateperfil');    
  }

}
