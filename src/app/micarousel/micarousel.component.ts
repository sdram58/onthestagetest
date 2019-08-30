import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';

@Component({
  selector: 'micarousel',
  templateUrl: './micarousel.component.html',
  styleUrls: ['./micarousel.component.scss']
})
export class MicarouselComponent implements OnInit, OnChanges {
  @Input() images:string[];
  @Input() text1:string[];
  @Input() text2:string[];
  @Input() duracion:number;

  private imagenes:string[];

  //images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(private config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000; //milisegundos
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(){
    this.reformImages();
  }

  ngOnChanges(changes: SimpleChanges) {
    const images: SimpleChange = changes.images;
    const text1: SimpleChange = changes.text1;
    const text2: SimpleChange = changes.text2;
    this.images = images.currentValue;
    if(this.images){
     // console.log("EntraSDFSD");
      this.reformImages();
      //console.log("Imagenes", this.imagenes);
    }      
  }

  reformImages(){
    if(this.images){
      this.imagenes = this.images.map((x)=>{
        //console.log("Entra 2.5", x);
        return x.replace("v1/fotoany","thumbnails");
      });        
      if(this.duracion){
        this.config.interval = this.duracion;
      }
    }
    
  }

}
