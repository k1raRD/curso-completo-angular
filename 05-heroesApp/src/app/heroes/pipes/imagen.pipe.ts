import { Pipe, PipeTransform } from "@angular/core";
import { Heroe } from "../interfaces/heroe.interface";

@Pipe({
    name: 'imagen',
    pure: false
})
export class ImagenPipe implements PipeTransform {

    private baseUrl: string = 'assets/heroes';

    transform(heroe: Heroe): string {
        if (!heroe.id && !heroe.alt_img) {
            return `${this.baseUrl}/no-image.png`
        } else if (heroe.alt_img) {
            return heroe.alt_img;
        } else {
            return `${this.baseUrl}/${heroe.id}.jpg`;
        }
    }

}