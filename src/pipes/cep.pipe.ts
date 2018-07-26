import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    try{
      let valor = value.toString()
      let values = `${valor.substring(0,4)}-${valor.substring(5)}`;
      return values;
    } catch(e){
      return value;
    }
  }
}
