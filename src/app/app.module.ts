import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Sanitizer } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Globales } from './Globales';
import { Texto } from './Texto';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatNativeDateModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArtistaComponent } from './artista/artista.component';
import { LocalComponent } from './local/local.component';
import { EventoComponent } from './evento/evento.component';
import { SimpleDialogComponent } from './simple-dialog/simpledialog.component';
import { HomeComponent } from './home/home.component';
import { EventminService } from './eventmin.service';
import { EventService } from './event.service';
import { LocalService } from './local.service';
import { ArtistaService } from './artista.service';
import { ArtistaminService } from './artistamin.service';
import { LocalminService } from './localmin.service';
import { LoginService } from './login.service';
import { LogupService } from './logup.service';
import { MainComponent } from './main/main.component';
import { MispinnerComponent } from './mispinner/mispinner.component';
import { RegArtistaComponent } from './reg-artista/reg-artista.component';
import { RegLocalComponent } from './reg-local/reg-local.component';
import { RegUsuarioComponent } from './reg-usuario/reg-usuario.component';
import { TipoEventoComponent } from './tipo-evento/tipo-evento.component';
import { ProcedenciaComponent } from './procedencia/procedencia.component';

import {NgbModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';
import { AddEventComponent } from './add-event/add-event.component';
import { StorageService } from './storage.service';
import { SearchItemComponent } from './search-user/search-item/search-item.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { MyImgComponent } from './my-img/my-img.component';
import { NoregLocalComponent } from './noreg-local/noreg-local.component';
import { NoregArtistaComponent } from './noreg-artista/noreg-artista.component';
import { AmazingTimePickerModule  } from 'amazing-time-picker';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';
import { BuscarEventosComponent } from './buscar-eventos/buscar-eventos.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { ActualizarPerfilComponent } from './actualizar-perfil/actualizar-perfil.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { ItemEventoComponent } from './mis-eventos/item-evento/item-evento.component';
import { InSpinnerComponent } from './mispinner/in-spinner/in-spinner.component';
import { DetalleArtistaComponent } from './artista/detalle-artista/detalle-artista.component';
import { DetalleLocalComponent } from './local/detalle-local/detalle-local.component';
import { DetalleEventoComponent } from './evento/detalle-evento/detalle-evento.component';
import { MicarouselComponent } from './micarousel/micarousel.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { Carousel2Component } from './micarousel/carousel2/carousel2.component';
import { BuscarComponent } from './buscar-eventos/buscar/buscar.component';
import { MisFavoritosComponent } from './mis-favoritos/mis-favoritos.component';
import { EventosComponent } from './mis-favoritos/eventos/eventos.component';
import { ArtistasComponent } from './mis-favoritos/artistas/artistas.component';
import { LocalesComponent } from './mis-favoritos/locales/locales.component';
import { ListaEventosComponent } from './evento/lista-eventos/lista-eventos.component';
import { EventosBusquedaComponent } from './eventos-busqueda/eventos-busqueda.component';
import { ListaEventoComponent } from './eventos-busqueda/lista-evento/lista-evento.component';
import { ItemEventoBusquedaComponent } from './eventos-busqueda/item-evento/item-evento.component';
import { SeparadorComponent } from './utiles/separador/separador.component';
import { HoraPipe } from './utiles/hora.pipe';
import { ListarartistasPipe } from './utiles/listarartistas.pipe';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("635548461071-komoijs6jnd11q5ucsc3pa8oa5eie6p4.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    ArtistaComponent,
    LocalComponent,
    EventoComponent,
    HomeComponent,
    MainComponent,
    MispinnerComponent,
    RegArtistaComponent,
    SimpleDialogComponent,
    RegLocalComponent,
    RegUsuarioComponent,
    TipoEventoComponent,
    ProcedenciaComponent,
    AddEventComponent,
    SearchItemComponent,
    SearchUserComponent,
    MyImgComponent,
    NoregLocalComponent,
    NoregArtistaComponent,
    MisEventosComponent,
    BuscarEventosComponent,
    EditarEventoComponent,
    ActualizarPerfilComponent,
    BackButtonComponent,
    ItemEventoComponent,
    InSpinnerComponent,
    DetalleArtistaComponent,
    DetalleLocalComponent,
    DetalleEventoComponent,
    MicarouselComponent,
    MenuBarComponent,
    Carousel2Component,
    BuscarComponent,
    MisFavoritosComponent,
    EventosComponent,
    ArtistasComponent,
    LocalesComponent,
    ListaEventosComponent,
    EventosBusquedaComponent,
    ListaEventoComponent,
    ItemEventoBusquedaComponent,
    SeparadorComponent,
    HoraPipe,
    ListarartistasPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    SocialLoginModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatTabsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    FormsModule,ReactiveFormsModule,    
    MatFormFieldModule,
    MatProgressSpinnerModule,
    AmazingTimePickerModule,
    MatButtonModule,
    NgbCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHZehshhiFhCMHWqTj_bdedtEodI07s2M'
    }),
    RouterModule.forRoot([
      {
        path:'',
        component: HomeComponent
      },
      {
        path:'main',
        component: MainComponent
      },
      {
        path:'artista/:id',
        component: ArtistaComponent
      },
      {
        path:'artistas',
        component: ArtistaComponent
      },
      {
        path:'addEvent',
        component: AddEventComponent
      },
      {
        path:'regartista',
        component: RegArtistaComponent
      },
      {
        path:'reglocal',
        component: RegLocalComponent
      },
      {
        path:'regusuario',
        component: RegUsuarioComponent
      },
      {
        path:'evento/:id',
        component: EventoComponent
      },
      {
        path:'listaevento/:idusr/:tipousr/:anteriores',
        component: ListaEventosComponent
      },
/*       {
        path:'eventosbusqueda/:query',
        component: EventosBusquedaComponent
      }, */
      {
        path:'eventosbusqueda',
        component: EventosBusquedaComponent
      },
      {
        path:'editarevento/:id',
        component: EditarEventoComponent 
      },
      {
        path:'eventos',
        component: EventoComponent
      },
      {
        path:'miseventos',
        component: MisEventosComponent
      },
      {
        path:'buscarlocales',
        component: MisEventosComponent
      },
      {
        path:'buscarartistas',
        component: MisEventosComponent
      },
      {
        path:'buscarevento',
        component:BuscarEventosComponent
      },
      {
        path:'buscar',
        component:BuscarComponent
      },
      {
        path:'updateperfil',
        component:ActualizarPerfilComponent
      },
      {
        path:'local/:id',
        component: LocalComponent
      },
      {
        path:'locales',
        component: LocalComponent
      },
      {
        path:'**',
        component: PageNotFoundComponent
      },
      
    ])     
  ],
  entryComponents:[
    SimpleDialogComponent
  ],
  providers: [ 
    Globales, 
    Texto, 
    ArtistaService, 
    ArtistaminService, 
    EventminService, 
    EventService, 
    LocalminService, 
    LocalService,
    LoginService,
    LogupService,    
    StorageService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
