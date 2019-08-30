import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Globales } from 'src/app/Globales';

@Component({
  selector: 'separador',
  templateUrl: './separador.component.html',
  styleUrls: ['./separador.component.scss']
})
export class SeparadorComponent implements OnInit {
  @Input() texto:string;
  @Input() bgColor:string;
  @Input() negrita:boolean;
  @Input() colorSepararador:string;
  @Input() color:string;
  @Input() size:string;
  @ViewChild('text') text:ElementRef;
  @ViewChild('padre') padre:ElementRef;
  @ViewChild('separador') separador:ElementRef;
  constructor(
    private GLOBALES:Globales,
    private renderer:Renderer2
  ) { }

  ngOnInit() {
    
    this.GLOBALES.colorEvento
    if(!this.color) this.color = this.GLOBALES.colorFuenteDefault;
    this.renderer.setStyle(this.text.nativeElement,"color",this.color);
    if(!this.bgColor) this.bgColor = "";
    this.renderer.setStyle(this.text.nativeElement,"background-color",this.bgColor);
    this.renderer.setStyle(this.padre.nativeElement,"background-color",this.bgColor);
    if(!this.size) this.size = this.GLOBALES.tamanyoFuenteDefault;
    this.renderer.setStyle(this.text.nativeElement,"font-size",this.size);
    if(!this.colorSepararador) this.colorSepararador = this.GLOBALES.colorGrisClaro;
    this.renderer.setStyle(this.separador.nativeElement,"background-color",this.colorSepararador);
    if(this.negrita){
      this.renderer.setStyle(this.text.nativeElement,"font-weight","bold");
    }else{
      this.renderer.setStyle(this.text.nativeElement,"font-weight","normal");
    }
  }

}
