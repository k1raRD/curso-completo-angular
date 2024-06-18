import { Pipe, PipeTransform } from "@angular/core";
import { Color } from "../interfaces/ventas.inrefaces";

@Pipe({
    name: 'color'
})
export class ColorPipe implements PipeTransform{

    colors: string[] = ['rojo', 'negro', 'azul', 'verde']

    transform(value: Color): string {
        return this.colors[value]; 
    }

}