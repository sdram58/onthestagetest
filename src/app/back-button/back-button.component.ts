import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Texto } from '../Texto';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
@Input() origen:string;
@Input() inicio:boolean;
  constructor(
    private route:Router,
    private Texto:Texto
  ) { }

  ngOnInit() {
  }


  volver(){
    if(this.inicio === true){
      this.route.navigateByUrl('');
    }else{
      this.route.navigateByUrl(this.origen);
    }
  }

}
