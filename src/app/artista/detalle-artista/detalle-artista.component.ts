import { Component, OnInit, Input,OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Artista } from 'src/app/modelo/Artista';
import { Texto } from 'src/app/Texto';
import { Globales } from 'src/app/Globales';
import { EventService } from 'src/app/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'detalle-artista',
  templateUrl: './detalle-artista.component.html',
  styleUrls: ['./detalle-artista.component.scss']
})
export class DetalleArtistaComponent implements OnInit, OnChanges {
  @Input() artista:Artista;

  private imagenes:string[];
  private texto1:string[];
  private texto2:string[];

  private numFavoritos:number;

  constructor(
    private Texto:Texto,
    private eventService: EventService,
    private GLOBALES:Globales,
    private router:Router
  ) { }

  ngOnInit() {    
  }

  ngOnChanges(changes: SimpleChanges) {
    const artista: SimpleChange = changes.artista;
    let mArtista:Artista = <Artista>artista.currentValue;
    if(mArtista){
      this.eventService.getNumFavoritos(this.artista.id, this.GLOBALES.ARTISTA_SCOPE).subscribe(
        res => {
          if(res >= 0){
            this.numFavoritos = res;
          }
        }
      );  
      this.imagenes = [];
      this.texto1 =[];
      this.texto2 =[];
      if(mArtista.foto1!=""){
        this.imagenes.push(mArtista.foto1);
      }
      if(mArtista.foto2!=""){
        this.imagenes.push(mArtista.foto2);
      }
      if(mArtista.foto3!=""){
        this.imagenes.push(mArtista.foto3);
      }
      if(mArtista.foto4!=""){
        this.imagenes.push(mArtista.foto4);
      }
      if(mArtista.foto5!=""){
        this.imagenes.push(mArtista.foto5);
      }
      if(mArtista.foto6!=""){
        this.imagenes.push(mArtista.foto6);
      }
    }
    
  }

  webPressed(){
    if(this.artista.pweb)
      window.open(this.artista.pweb);  
  }

  youtubePressed(){
    if(this.artista.video)
      window.open(this.artista.video);  
  }

  facebookPressed(){
    if(this.artista.facebook)
      window.open(this.artista.facebook);  
  }

  instagramPressed(){
    if(this.artista.instagram)
      window.open(this.artista.instagram);  
  }

  twitterPressed(){
    if(this.artista.twitter)
      window.open(this.artista.twitter);  
  }

  favoritoPressed(idArtista){
     this.eventService.setFavorito(this.artista.id,this.GLOBALES.ARTISTA_SCOPE,!this.artista.esFavorito).subscribe((res)=>{
      if(res>=0){
        this.artista.esFavorito = !this.artista.esFavorito;
        this.numFavoritos = res;
      }
    },
    (err)=>{

    }); 
  
  }


  irAHistorial(){
   this.router.navigateByUrl("listaevento/" + this.artista.id +"/"+this.GLOBALES.ARTISTA_SCOPE +"/1");
  }

}
