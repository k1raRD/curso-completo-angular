import { FormControl } from "@angular/forms";

export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}";

export const noPuedeSerStrider = (control: FormControl) => {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'strider') {
        return {
            noStrider: true
        }
    }
    return null;
}