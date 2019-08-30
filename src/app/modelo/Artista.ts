import { TipoEvento } from "./TipoEvento";
import { Localidad } from "./Localidad";
import { Pais } from "./Pais";

export class Artista {
    public id:number; // Primary Key
    public email:string;
    public nombre:string;
    public m_pass:string;
    public apellidos:string;
    public fotoperfil:string;
    public nartista:string;
    public foto1:string;
    public foto2:string;
    public foto3:string;
    public foto4:string;
    public foto5:string;
    public foto6:string;

    public facebook:string;
    public twitter:string;
    public instagram:string;

    public tipo_espectaculo:TipoEvento;
    public localidad:Localidad;
    public integrantes:number;
    public desc_espectaculo:string;
    public destacado:boolean;
    public activado:boolean;
    public registrado:boolean;
    public recursos:boolean;
    public video:string;
    public pweb:string;
    public pais:Pais;
    public premium:boolean;

    public cache: number;
    public tipousuario: number;
    public esFavorito:boolean;

    constructor(){
        this.id = null; // Primary Key
    this.email = null;
    this.nombre = null;
    this.m_pass = null;
    this.apellidos = null;
    this.fotoperfil = null;
    this.nartista = null;
    this.foto1 = null;
    this.foto2 = null;
    this.foto3 = null;
    this.foto4 = null;
    this.foto5 = null;
    this.foto6 = null;

    this.facebook = null;
    this.twitter = null;
    this.instagram = null;

    this.tipo_espectaculo = null;
    this.localidad = null;
    this.integrantes = null;
    this.desc_espectaculo = null;
    this.destacado = null;
    this.activado = null;
    this.registrado = null;
    this.recursos = null;
    this.video = null;
    this.pweb = null;
    this.pais = null;
    this.premium = null;

    this.cache = null;
    this.tipousuario = null;
    this.esFavorito = null;
    }
}

export class ArtistaNoReg{
    public id:number; // Primary Key
    public nartista:string;
    public foto1:string;
    public desc_espectaculo:string;
    public tipo_espectaculo:TipoEvento;
    public tipousuario: number;

    constructor(){
        this.id = null; // Primary Key
        this.nartista = null;
        this.foto1 = null;
        this.tipo_espectaculo = null;
        this.desc_espectaculo = null;
        this.tipousuario = null;
    }
}