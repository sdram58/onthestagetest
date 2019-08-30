// globals.ts
import { Injectable } from '@angular/core';
import { Globales } from './Globales';

@Injectable()
export class Texto {
  APP_NAME: string = 'OnTheStage';
  i=null;
  constructor(
    private GLOBALES:Globales
  ){
    let userLang = navigator.language;
    this.GLOBALES.LOCALE = userLang;
    if( userLang.toLowerCase().indexOf('es') >= 0){
      this.i=this.idiomas.ES;
      this.idioma="ES";
    }else if( userLang.toLowerCase().indexOf('ca') >= 0){
      this.i=this.idiomas.CA;
      this.idioma="CA";
    }else if( userLang.toLowerCase().indexOf('en') >= 0){
      this.i=this.idiomas.EN;
      this.idioma="EN";
    }else if( userLang.toLowerCase().indexOf('de') >= 0){
      this.i=this.idiomas.DE;
      this.idioma="DE";
    }else{
      this.i=this.idiomas.ES;
      this.idioma="ES";
    }    
  }

  idioma:string="ES";

  idiomas={
      ES:{
        ACEPTAR:"Aceptar",
        ADD:"Añadir",
        ADD_EVENT:"Añadir Evento",
        ADDED_EVENT_OK:"Evento añadido con éxito",
        ADDED_EVENT_KO:"Ha habido un problema al añadir un nuevo evento.",
        APELLIDOS:"Apellidos",
        APP_NAME: 'On The Stage',
        ARTISTA:"Artista",
        ARTISTAS:"Artistas",
        BAD_CACHE:"Campo caché incorrecto",
        BAD_DESC_EVENTO: "Descripción del espectáculo vacía",
        BAD_DESC_LOCAL: "Descripción del local vacía",
        BAD_FNAC_:"Fecha de nacimiento incorrecta",
        BAD_LOCALIDAD: "Localidad incorrecta",
        BAD_NUM_INTEGRANTES:"Número de integrantes incorrecto",
        BAD_PAIS:"País incorrecto",
        BAD_PASS:"Contraseña incorrecta",
        BAD_PATTERN:"Patrón incorrecto",
        BAD_TELF:"Teléfono incorrecto",
        BAD_TIPO_EVENT:"Tipo de evento incorrecto",
        BAD_TODO_EQUIPO: "Campo equipo necesario incorrecto",
        BAD_USER:"Usuario incorrecto",
        BUSCAR:"Buscar",
        BUSCAR_ARTISTA:"Buscar Artista",
        BUSCAR_EVENTO:"Buscar Evento",
        BUSCAR_LOCAL:"Buscar Local",
        CACHE:"Caché por espectáculo",
        CAR_TEC:"Características Técnicas",
        CHOOSE_DAY:"Elige día",
        COMUNIDAD:"Comunidad",
        CONXION_ERROR:"Ha habido un problema con la conexón",
        COORDS: "Coordenadas",
        DESC_ARTISTA: "Descripción del artista",
        DESC_EVENTO: "Descripción del espectáculo",
        DESC_LOCAL: "Descripción del local",
        DESCRIPCION: "Descripción",
        DIA:"Día",
        DIRECCION:"Dirección",
        DISTANCIA:"Distancia",
        EDAD_MINIMA:"Edad mínima",
        EDITED_EVENT_KO:"Evento actualizado con éxito",
        EMAIL:"Email",
        ENTRAR:"Entrar",
        ENTRAR_COMO:"Entrar como",
        ENTRAR_FB:"Entrar con Facebook",
        ENTRAR_GG:"Entrar con ",
        ENVIADO_OK:"Enviado con éxito!",
        EVENTO:"Evento",
        EVENTOS:"Eventos",
        EVENTOS_ANTERIORES:"Eventos anteriores",
        EVENTOS_DE:"Eventos de",
        EVENTOS_HOY:"Eventos de hoy",
        EVENTOS_PROXIMOS:"Eventos próximos",
        FACEBOOK:"Facebook",
        FAV:"Favorito",
        FAVS:"Favoritos",
        FECHA:"Fecha",
        FNAC:"Fecha de nacimiento",
        FILTRO:"Filtro",
        FORMAT_ERROR_EMAIL:"Formato de correo incorrecto ej. abcd@domain.com",
        FOTO:"Foto",
        FOTO_ARTISTA:"Foto del artista",
        FOTO_EVENTO:"Foto del evento",
        FOTO_LOCAL:"Foto del local",
        FOTO_PER:"Foto de perfil",
        FOTO_PERFIL:"Foto de perfil",
        FOTOS:"Fotos",
        GRATIS:"Gratis",
        HISTORIAL:"Historial",
        HOME:"Inicio",
        HORA:"Hora",
        HOY:"Hoy",
        IN_DATOS:"Introduce tus datos",
        INSTAGRAM:"Instagram",
        IR:"Ir",
        LATITUD:"Latitud",
        LISTADO:"Listado",
        LISTA_EVENTOS:"Lista de eventos",
        LIVE_MUSIC:"Música en directo",
        LLAMAR:"Llamar",
        LOCAL:"Local",
        LOCALAES:"Locales",
        LOCALIDAD: "Localidad",
        LOGO: "Logo",
        LONGITUD:"Longitud",
        MAPA:"Mapa",
        MESES:['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
        MI_DISPONIBILIDAD:"Mi disponibilidad",
        MIS_BUSQUEDAS:"Mis búsquedas",
        MIS_EVENTOS:"Mis Eventos",
        MIS_FAVS:"Mis Favoritos",
        NEXT_7_DAYS:"Próximos 7 días",
        NEXT_30_DAYS:"Próximos 30 días",
        NO:"No",
        NO_EMPTY:"No puede estar vacío",
        NO_EVENTS:"Sin eventos",
        NO_IMPORTA:"No importa",
        NOMBRE:"Nombre",
        NOMBRE_ARTISTICO:"Nombre Artístico",
        NOMBRE_EVENTO:"Nombre del evento",
        NOMBRE_LOCAL:"Nombre del local",
        NUEVO:"Nuevo",
        NUM_INTEGRANTES:"Número de integrantes",
        NUM_PARTICIPANTES:"Número de participantes",
        OBSERVACIONES: "Observaciones",
        OBS_EVENTO: "Observaciones del evento",
        PAIS:"País",
        PARTICIPANTES:"Participantes",
        PASS:"Contraseña",
        PASS_MISMATCH:"Las contraseñas no coinciden",
        PERFIL:"Perfil",
        PRECIO:"Precio",
        PRECIO_QUESTION:"¿Precio?",
        PROGRAMACION_DE:"Buscar programación de...",
        PROVINCIA:"Provincia",
        PUBLICO:"Público",
        REDES_SOCIALES:"Redes Sociales",
        REGISTRARSE: "Registrarse",
        REGISTRO:"Registro",
        REGISTRO_OK:"Registro realizado con éxito, recibirá un correo para su activación",
        REGISTRO_OK_NO_MAIL:"Registro realizado con éxito.",
        REP_PASS:"Repita contraseña",
        RESULTADOS: "resultados",
        SALIR:"Salir",
        SI:"Sí",
        SIN_DATOS:"Sin datos",
        SOME_THING_WAS_WRONG:"Algo ha ido mal",
        T_EVENT: "Tipo de espectáculo",
        T_MUSICA: "Tipo de música en directo",
        TELF: "Teléfono",
        TIPO:"Tipo",
        TITULO_REDES:"¿Eres de redes sociales?",
        TITULO_REDES2:"Díselo a tus fans!",
        TODO_EQUIPO: "¿Tiene todo el equipo necesario para realizar el espectáculo?",
        TWITTER:"Twitter",
        UPDATE_PERFIL:"Actualizar Perfil",
        URL_COMPRA:"Dirección de compra",
        URL_COMPRA_TIP:"¿Dónde comprar? https://...",
        USUARIO:"Usuario",
        USUARIOS:"Usuarios",
        VARIOS:"Varios",
        VER:"Ver",
        WEB:"Web",
        WELCOME:"Bienvenido",
        WHAT:"¿Qué?",
        WHEN:"¿Cuándo?",
        WHERE:"¿Dónde?",
        WHO:"¿Quién?",
        YOUTUBE:"Youtube",
        VOLVER:"Volver",
      },
      CA:{
        EVENTO:"Event",
        ARTISTA:"Artista",
      },
      EN:{
        EVENTO:"Event",
        ARTISTA:"Artist",
      },
      DE:{
        EVENTO:"Eventusken",
        ARTISTA:"Artist",
      }
    }




}