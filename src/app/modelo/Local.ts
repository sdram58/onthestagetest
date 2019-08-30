import { Localidad } from './Localidad'
import { Horario } from './Horario'
import { Pais } from './Pais';
export class Local {
    public id:number;
    public nombre:string;
    public nlocal:string;
    public apellidos:string;
    public email:string;
    public m_pass:string;
    public telf:string;
    public direccion:string;
    public latitud:number;
    public longitud:number;
    public horario:Horario[];
    public web:string;
    public descripcion:string;
    public premium:boolean;
    public destacado:boolean;
    public localidad:Localidad;
    public fotoperfil:string;
    public foto1:string;
    public foto2:string;
    public foto3:string;
    public foto4:string;
    public activado;
    public registrado;
    public geo:string;
    public tipousuario:number;
    public facebook:string;
    public instagram:string;
    public twitter:string;
    public video:string;
    public esFavorito:boolean;
    public pais:Pais;

    constructor(){
        this.id = null;
        this.nombre = null;
        this.nlocal = null;
        this.apellidos = null;
        this.email = null;
        this.m_pass = null;
        this.telf = null;
        this.direccion = null;
        this.latitud = null;
        this.longitud = null;
        this.horario = null;
        this.web = null;
        this.descripcion = null;
        this.premium = null;
        this.destacado = null;
        this.localidad = null;
        this.fotoperfil = null;
        this.foto1 = null;
        this.foto2 = null;
        this.foto3 = null;
        this.foto4 = null;
        this.activado = null;
        this.registrado = null;
        this.geo = null;
        this.tipousuario = null;
        this.facebook = null;
        this.instagram = null;
        this.twitter = null;
        this.video = null;
        this.esFavorito = null;
        this.pais = null;
    }

}
export class LocalNoReg{
    public id:number;
    public nlocal:string;
    public direccion:string;
    public latitud:number;
    public foto:string;
    public longitud:number;
    public descripcion:string;
    public localidad:Localidad;
    public geo:string;
    public tipousuario:number;
    public pais:Pais;

    constructor(){
        this.id = null;
        this.nlocal = null;
        this.direccion = null;
        this.latitud = null;
        this.longitud = null;
        this.descripcion = null;
        this.localidad = null;
        this.foto = null;
        this.geo = null;
        this.tipousuario = null;
        this.pais = null;
    }
}