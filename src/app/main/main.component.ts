import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '../../../node_modules/@angular/router';
import { Globales } from '../Globales';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router, private GLOBALES:Globales) { }

  ngOnInit() {

    if(this.GLOBALES.LOGGED === false){
      this.router.navigateByUrl('');
    }
    console.log("Entra en main " + this.GLOBALES.LOGGED);
  }
}
