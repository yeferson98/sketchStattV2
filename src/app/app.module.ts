import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { AppComponent } from './app.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import { from } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import {AngularFireModule}from '@angular/fire';
//import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';



import { PanelComponent } from './panel/panel.component';
import { EspecialidadComponent } from './panel/especialidad/especialidad.component';
import { ListComponent } from './panel/especialidad/list/list.component';
import { NewComponent } from './panel/especialidad/new/new.component';
import {EspecialidadService} from './services/especialidad.service';
import {AliasService} from './services/alias.service';
import { AliasComponent } from './panel/alias/alias.component';
import { NewAliasComponent } from './panel/alias/new-alias/new-alias.component';
import { ListAliasComponent } from './panel/alias/list-alias/list-alias.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CategoriaComponent } from './panel/categoria/categoria.component';
import { ListCategoriaComponent } from './panel/categoria/list-categoria/list-categoria.component';
import { NewCategoriaComponent } from './panel/categoria/new-categoria/new-categoria.component';
import { ProfesionalesComponent } from './panel/profesionales/profesionales.component';
import { NewProfesionalesComponent } from './panel/profesionales/new-profesionales/new-profesionales.component';
import { ListProfesionalesComponent } from './panel/profesionales/list-profesionales/list-profesionales.component';
import { CategoriaService } from './services/categoria.service';
import { ProfesionalService } from './services/profesional.service';
import {AngularFireStorage} from '@angular/fire/storage';
import { RestApiBackendService } from './services/rest-api-backend.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    EspecialidadComponent,
    ListComponent,
    NewComponent,
    AliasComponent,
    NewAliasComponent,
    ListAliasComponent,
    SidebarComponent,
    HeaderComponent,
    CategoriaComponent,
    ListCategoriaComponent,
    NewCategoriaComponent,
    ProfesionalesComponent,
    NewProfesionalesComponent,
    ListProfesionalesComponent,
    LoginComponent,
    
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule.forRoot([
      {path:'', component:PanelComponent,
      children:[ 
        {path:'',redirectTo:'Panel-Control',pathMatch:'full'},
        {path:'Panel-Control',component:EspecialidadComponent},
        {path:'Alias',component:AliasComponent},
        {path:'Categoria', component:CategoriaComponent},
        {path:'Profesional', component:ProfesionalesComponent}
      ]
      }
    ])
  ],
  providers: [
    EspecialidadService,
    AliasService,
    CategoriaService,
    ProfesionalService,
    AngularFireStorage,
    RestApiBackendService,
    //{provide:FirestoreSettingsToken, useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
