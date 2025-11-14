import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit:number = 68, ellipsis:string ='...'): string {
    if(value.length < limit) {
      return value;
    } else {
      return value.slice(0,limit)+ellipsis;
    }
  }

}
