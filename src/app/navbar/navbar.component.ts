import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '../../../node_modules/@angular/material';
import {Globales} from '../Globales';
import {Texto} from '../Texto';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  shouldRun = true;
  estaOculto=true;
  @ViewChild('sidenav') public myNav: MatSidenav;
  constructor(private globales: Globales, private TEXTO:Texto, private ss:StorageService) {
  }

  ngOnInit() {
  }

  hideMenu(){
    this.estaOculto = true;
    this.myNav.close();
  }

   togglenav(){
    if(this.estaOculto){
      this.myNav.open();
    }else{
      this.myNav.close();
    }
    this.estaOculto = !this.estaOculto;
  }

  exit(){    
    this.ss.delUser();        
    this.hideMenu();
  }

}
