import { TouchSequence } from "selenium-webdriver";

export class EventoMin {
    public id:number; // Primary Key
    public dia:string;
    public hora:string;
    public foto:string;
    public nombre:string;
    public telefono:string;
    public distancia:number;
    public latitud:number;
    public longitud:number;
    public precio:number;
    public local:string;
    public artistas:string[];
    public esFavorito:boolean;
    public numFavoritos:number;
    public tipoevento:number;
    public descripcion:string;
    public tickets:string;
    public autor:number;
    public scope_autor:number;

    constructor(){
        this.id = null; // Primary Key
        this.dia = null;
        this.hora = null;
        this.foto = null;
        this.nombre = null;
        this.telefono = null;
        this.distancia = null;
        this.latitud = null;
        this.longitud = null;
        this.precio = null;
        this.local = null;
        this.artistas = null;
        this.esFavorito = null;
        this.numFavoritos = null;
        this.tipoevento = null;
        this.descripcion = null;
        this.tickets = null;
        this.autor = null;
        this.scope_autor = null;
    }

}