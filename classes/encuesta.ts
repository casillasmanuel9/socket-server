export class EncuestaData {
    private opciones : string[] = ['opcion 1', 'opcion 2', 'opcion 3', 'opcion 4'];
    private valores: number[] = [1,1,7,0];

    getDataEncuesta() {
        return [{data: this.valores, label: 'Respuestas'}]
    }

    incrementar(opcion: string, valor: number) {
        opcion = opcion.toLowerCase().trim();

        this.opciones.forEach((opcionArray, i) => {
            if(opcionArray === opcion) {
                this.valores[i] += valor;
            }
        });

        return this.valores;
    }
}