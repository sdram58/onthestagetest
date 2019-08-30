import { Artista } from './Artista';
import { TipoEvento } from './TipoEvento';
import { Local } from './Local';

export class Evento {

    public id:number; // Primary Key
    public dia:string;
    public hora:string;
    public foto:string;
    public nombre:string;
    public numFavoritos:number;
    public destacado:boolean;
    public precio:number;
    public edad_minima:number;
    public ofertas:string;
    public asistentes:number;
    public local:Local;
    public tipo:TipoEvento[];
    public descripcion:string;
    public artistas:Artista[];
    public esFavorito:boolean;
    public asistira:boolean;
    public tickets:string;
    public autor:number;
    public scope_autor:number;

    constructor(){
        this.id = null; // Primary Key
        this.dia = "";
        this.hora = "";
        this.foto = null;
        this.nombre = null;
        this.numFavoritos = null;
        this.destacado = null;
        this.precio = null;;
        this.edad_minima = null;
        this.ofertas = null;
        this.asistentes = null;
        this.local = new Local();
        this.tipo = [];
        this.descripcion = null;
        this.artistas = [];
        this.esFavorito = null;
        this.asistira = null;
        this.tickets = null;
        this.autor = null;
        this.scope_autor = null;
    }
    
}