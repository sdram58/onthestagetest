import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(hora: string, args?: any): string {
    let horas:string[]=hora.split(":");
    return horas[0]+":"+horas[1];
  }

}
