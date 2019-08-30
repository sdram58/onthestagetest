import { Globales } from 'src/app/Globales';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'my-img',
  templateUrl: './my-img.component.html',
  styleUrls: ['./my-img.component.scss']
})
export class MyImgComponent implements OnInit, OnChanges {
  @ViewChild('foto') foto: ElementRef;
  @Input() src:string;
  @Input() alt:string;
  @Input() title:string;
  @Input() bgColor:string;
  @Input() visible:boolean;
  @Input() altoancho:string; //true: alto  false: ancho

  mSrc:string="";
  url:string;
  estilo:any={};

  constructor(private http:HttpClient, 
    private GLOBALES:Globales) {
      this.estilo['background-color'] = this.bgColor;
      this.estilo['background-image'] = "url('"+ this.GLOBALES.LOADING_IMAGE + "')";
      this.url = null;  
   }

  ngOnInit() {
    /*setTimeout(()=>{
      this.getImage();
    });*/
    if(this.src){
      this.url = this.src.replace("fotoany","fotoany2");
    }
    
    this.getImage();
    /*console.log(this.altoancho);
    if(this.altoancho.toLowerCase().localeCompare("alto")== 0){
      this.estilo['height'] ='100%';
      //this.alto = '100%';
    }
    if(this.altoancho == "ancho"){
      this.estilo['width']='100%';
      //this.ancho= '100%';
    }*/
  }

  ngOnChanges(change:SimpleChanges){
    if(change.src.currentValue){
      this.url = (<string>change.src.currentValue).replace("fotoany","fotoany2");
      if(this.url.toLocaleLowerCase().localeCompare(this.GLOBALES.LOADING_IMAGE.toLocaleLowerCase())==0){
        setTimeout(()=>{
          this.estilo['background-image'] = "url('"+ this.GLOBALES.NOTFOUND_IMAGE + "')";
          this.estilo['background-color'] = this.bgColor;
          console.log("Estilo ---> " + this.bgColor);
        });
        
      }else{
        this.getImage();
      }
      
    }
  }

  getImage(){
    if(this.GLOBALES.TOKEN != null && this.url!= null){
      const headers = new HttpHeaders()
        .set("Authorization", this.GLOBALES.TOKEN);
      this.http.get(this.url, {headers}).subscribe(
        res => {
          if(res['STATUS']=="OK"){
            this.estilo['background-image'] = "url('"+ res['DATA']['URL'] + "')";
            this.estilo['background-color'] = this.bgColor;
           //console.log("Estilo ---> " + this.bgColor);
          }else{
            this.estilo['background-image'] = "url('"+ this.GLOBALES.NOTFOUND_IMAGE + "')";
            this.estilo['background-color'] = this.bgColor;            
            //this.mSrc = this.GLOBALES.NOTFOUND_IMAGE;
          }
                       
        },
        err => {
          console.log("Error getting image 1");
          console.log(err);
          console.log("Error getting image 2");
          this.mSrc = this.GLOBALES.NOTFOUND_IMAGE;          
        }
      );
    }

  }
}
