import { Markador } from './markador';
export class Mapa {
    
    private markadores : {[ket: string]: Markador} = {
    '1':{
            id: "1",
            nombre: "Fernando",
            lng: -75.75512993582937,
            lat: 45.349977429009954,
            color: "#dd8fee",
        },
    '2':{
            id: "2",
            nombre: "Amy",
            lng: -75.75195645527508,
            lat: 45.351584045823756,
            color: "#790af0",
    },
    '3':{
            id: "3",
            nombre: "Orlando",
            lng: -75.75900589557777,
            lat: 45.34794635758547,
            color: "#19884b",
        }
    }

    constructor(){}

    getMarkadores() {
        return {...this.markadores};
    }

    borrarMarkador(id: string) {
        delete this.markadores[id];
        return this.markadores;
    }

    moverMarkador(markador: Markador) {
        console.log(markador);
        this.markadores[markador.id].lng = markador.lng;
        this.markadores[markador.id].lat = markador.lat;
    }

    agregarMarkador(markador: Markador) {
        this.markadores[markador.id] = markador;
    }

}