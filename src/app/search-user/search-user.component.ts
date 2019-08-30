import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Globales } from '../Globales';
import { Texto } from '../Texto';
import { ArtistaService } from '../artista.service';
import { LocalService } from '../local.service';
import { FormControl } from '@angular/forms';
import { ArtistaMin } from '../modelo/ArtistaMin';
import { LocalMin } from '../modelo/LocalMin';
import * as $ from 'jquery';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  @Input() scope_usuario; //Tipo de Usuario que queremos buscar
  private usuarios:any[];
  private usuariosOrig:any[];
  private buscar:FormControl = new FormControl('');  
  @Output() emitterSelectedUser:EventEmitter<any> = new EventEmitter<any>();

  private mBuscar;
  private offset:any = null;

  loading:boolean; //Si esta cargando muestra el spinner

  constructor(
    private GLOBALES:Globales,
    private Texto:Texto,
    private as:ArtistaService,
    private ls:LocalService) { 
      
    }

  ngOnInit() {
    //console.log("Search User Scope = " + this.scope_usuario);
    this.offset = {o:0, a: $('.buscar-lista').height()};
    this.loading = true;
    this.traerUsuarios("");
    var yo = this;
    $('.buscar-lista').scroll(function(event){
      //console.log("scrolleando");
      clearTimeout( $.data( this, "scrollCheck" ) );
      $.data( this, "scrollCheck", setTimeout(()=> {
        //console.log($(this).scrollTop()+ " altura " + $(this).height());
        
        yo.offset = {o:Math.floor($(this).scrollTop()), a: $('.buscar-lista').height()};
      }, 250) );
    });
  }

  traerUsuarios(filtro:string){
    switch(this.scope_usuario){
      case(this.GLOBALES.ARTISTA_SCOPE):{
        this.as.getArtistasMin().subscribe(
          res => {
            if(res != null){
              this.usuarios = res;
              this.usuariosOrig = res;
            }
            this.loading = false;
          },
          err => {
            console.log(err);
            this.loading = false;
          }
        )
        break;
      }
      case(this.GLOBALES.USER_SCOPE):{        
        
        break;
      }
      case(this.GLOBALES.LOCAL_SCOPE):{
        this.ls.getLocalaesMin().subscribe(
          res => {
            if(res != null){
              this.loading = false;
              this.usuarios = res;
              this.usuariosOrig = res;
            }
          },
          err => {
            console.log(err);
            this.loading = false;
          }
        )
        break;
      }
      default:{
        break;
      }
    }

  }

  getSelectedUser(usuario:any){
    this.emitterSelectedUser.emit(usuario);
  }

  filtrarUsuario(event:Event){      
    switch(this.scope_usuario){
      case this.GLOBALES.ARTISTA_SCOPE:{
        this.usuarios = [];
        this.usuarios = this.usuariosOrig.filter((artista)=>{
          let am = <ArtistaMin>artista;
          if(this.buscar.value =="" || am.nartista.toLowerCase().indexOf(this.buscar.value.toLowerCase())>=0){
            return artista;
          }
        });
        break;
      }
      case this.GLOBALES.LOCAL_SCOPE:{
        this.usuarios = [];
        this.usuarios = this.usuariosOrig.filter((local)=>{
          let loc = <LocalMin>local;
          if(this.buscar.value == "" || loc.nlocal.toLowerCase().indexOf(this.buscar.value.toLowerCase())>=0){
            return local;
          }
        });
        break;
      }
    }
    this.offset = {o:0, a: $('.buscar-lista').height()};
  }

}
