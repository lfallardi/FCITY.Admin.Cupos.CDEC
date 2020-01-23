import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

// NAVEGACION
import { LoginAdComponent } from './login-ad/login-ad.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { CuposComponent } from './cupos/cupos.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductosTransportadorasComponent } from './productosTransportadoras/productosTransportadoras.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { InternalUserGridComponent } from './internalUser/internalUser-grid/internalUser-grid.component';
import { EstadosTransportadorasComponent } from './estadosTransportadoras/estados-transportadoras/estados-transportadoras.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
    children: [
      { path: 'cupos', component: CuposComponent, /*canActivate: [AuthGuard],*/ data: {nexturl: '/cupos'} },
      { path: 'productos', component: ProductosTransportadorasComponent },
      { path: 'internalUser', component: InternalUserGridComponent,
        /* canActivate: [AuthGuard], */ data: { nexturl: '/internalUser', se: 'gridViewInternalUser'}},
      { path: 'consultas', children: [
        {path: 'Transportadoras-State', component: EstadosTransportadorasComponent}
      ]},
      { path: 'suppliers', component: ConfigurationComponent}
    ] },
  {path: 'login', component: LoginAdComponent},
  {path: '**', redirectTo: '', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
