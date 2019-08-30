import { Pipe, PipeTransform } from '@angular/core';
import { Artista } from '../modelo/Artista';

@Pipe({
  name: 'listarartistas'
})
export class ListarartistasPipe implements PipeTransform {

  transform(artistas: Artista[], args?: any): string {
    let mArtistas:string = "";
    artistas.forEach(element => {
      mArtistas += element.nartista + ", ";
    });
    mArtistas = mArtistas.substring(0, mArtistas.length -2 );
    if(mArtistas.length>30) mArtistas = mArtistas.substr(0, 30) +"...";
    return mArtistas.toUpperCase();
  }

}
