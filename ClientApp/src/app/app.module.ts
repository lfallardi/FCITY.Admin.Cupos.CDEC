import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NAVEGACION
import { LoginAdComponent } from './login-ad/login-ad.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductosTransportadorasComponent } from './productosTransportadoras/productosTransportadoras.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { InternalUserGridComponent } from './internalUser/internalUser-grid/internalUser-grid.component';
import { EditCupoBaseComponent } from './cupos/editCupoBase/editCupoBase.component';
import { TransportadorasStateComponent } from './consults/Transportadoras-state/Transportadoras-state.component';
import { CreateCuposProductosComponent } from './productosTransportadoras/createCuposProductos/create-cupos-productos/create-cupos-productos.component';
import { EstadosTransportadorasComponent } from './estadosTransportadoras/estados-transportadoras/estados-transportadoras.component';

// FIN DE NAVEGACION

import { TokenInterceptor } from '../interceptors/token.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatInputModule, MatProgressSpinnerModule,
   MatCardModule, MatDialogModule, MatSidenavModule, MatToolbarModule, MatListModule, MatDividerModule,
   MatSelectModule, MatTabsModule, MatPaginatorModule, MatSnackBarModule, MatBadgeModule,
   MatNativeDateModule, MatSortModule, MatExpansionModule, MatSlideToggleModule,
   MatGridListModule,
   MatDatepickerModule,
   MatTableModule
 } from '@angular/material';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidebarModule } from 'ng-sidebar';
import { MsalModule } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { CuposComponent } from './cupos/cupos.component';
import { DatePipe } from '@angular/common';
import { UiModule } from './ui/ui.module';
import { ModalConfirmComponent } from './common/modal-confirm/modal-confirm.component';


export function tokenGetter() {
   return localStorage.getItem('jwt');
}

export function loggerCallBack(logLevel, message, piiEntable) {
   console.log('Cliente logging' + message);
}

export const protectedResourceMap: [ string, string[]][] = [ [  'https://buildtodoservice.azurewebsites.net/api/todolist',
                                                               ['api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user']
                                                             ], [ 'https://graph.microsoft.com/v1.0/me',
                                                                 ['user.read']
                                                                ]
                                                            ];

const isIE = window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
   declarations: [
      AppComponent,
      CuposComponent,
      LoginAdComponent,
      LoginComponent,
      NotFoundComponent,
      ProductosTransportadorasComponent,
      ConfigurationComponent,
      InternalUserGridComponent,
      EditCupoBaseComponent,
      ModalConfirmComponent,
      TransportadorasStateComponent,
      CreateCuposProductosComponent,
      EstadosTransportadorasComponent
   ],
   imports: [
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserModule,
      MatButtonModule,
      MatCheckboxModule,
      MatMenuModule,
      MatIconModule,
      MatInputModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatDialogModule,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatDividerModule,
      MatSelectModule,
      MatTabsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatBadgeModule,
      MatNativeDateModule,
      MatSortModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatGridListModule,
      CalendarModule.forRoot({
         provide: DateAdapter,
         useFactory: adapterFactory
       }),
      NgxSpinnerModule,
      SidebarModule.forRoot(),
      // inicio de login con AD
      MsalModule.forRoot({
         clientID: 'be80aa86-2710-4446-a7bf-234728431f9a',
         authority: 'https://login.microsoftonline.com/farmacity.com.ar', // direccion del AD contra la que hay que validar.
         validateAuthority: true,
         redirectUri:  environment.redirectUrl,
         cacheLocation : 'localStorage',
         storeAuthStateInCookie: isIE, // set to true for IE 11
         postLogoutRedirectUri: environment.redirectUrl,
         navigateToLoginRequestUrl: true,
         popUp: !isIE,
         consentScopes: [ 'user.read', 'openid', 'profile', 'api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user'],
         unprotectedResources: ['https://www.microsoft.com/en-us/'],
         protectedResourceMap: protectedResourceMap,
         logger: loggerCallBack,
         correlationId: '1234',
         piiLoggingEnabled: true
      }),
      // fin de login con AD
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      UiModule
   ],
   providers: [AuthGuard, DatePipe, MatDatepickerModule,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: TokenInterceptor,
         multi: true
      }
   ],
   bootstrap: [ AppComponent ],
   entryComponents: [
      EditCupoBaseComponent,
      ModalConfirmComponent,
      CreateCuposProductosComponent
   ]
})

export class AppModule { }
