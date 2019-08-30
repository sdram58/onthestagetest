import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'carousel2',
  templateUrl: './carousel2.component.html',
  styleUrls: ['./carousel2.component.scss']
})
export class Carousel2Component implements OnInit, OnChanges {

  @Input() images:string[];
  @Input() text1:string[];
  @Input() text2:string[];
  @Input() duracion:number;
  @Output() onClick = new EventEmitter();

  private imagenes:string[];
  private nombre:string;
  private numImage:number = 0;

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
    this.text1 = text1.currentValue;
    this.images = images.currentValue;
    if(this.images){
      this.reformImages();
      if(this.text1){
        this.nombre = this.text1[0];
        if(this.text1.length==1){
          this.config.showNavigationArrows = false;
          this.config.showNavigationIndicators = false;        
        }
      }
    }      
  }

  reformImages(){
    if(this.images){
      this.imagenes = this.images.map((x)=>{        
        return x.replace("v1/fotoany","thumbnails");
      });        
      if(this.duracion){
        this.config.interval = this.duracion;       
      }
    }
    
  }

  cambiaSlide(e){
    this.numImage++;
    if(this.numImage>=this.text1.length){
      this.numImage = 0;
    }
    this.nombre = this.text1[this.numImage];
  }

  enviarNumFoto(){
    this.onClick.emit(this.numImage);
  }

}
