export class GraficaDate { 
    private meses : string[] = ['enero', 'febrero', 'marzo', 'abril'];
    private valores : number[] = [0,0,0,0];

    constructor () {}

    getDataGrafica() {
        return [
            { data: this.valores, label: 'Ventas' }
        ];
    }

    incrementar(mes: string, valor: number) {
        mes = mes.toLowerCase().trim();
        for (let i = 0; i < this.meses.length; i++) {
            if(this.meses[i]  === mes) {
                this.valores[i] += valor;
            }
        }

        return this.getDataGrafica();
    }


}