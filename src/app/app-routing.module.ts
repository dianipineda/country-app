import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/homePage/homePage.component';
import { AboutComponent } from './shared/pages/about/about.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomePageComponent,
  // },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./countries/countries.module').then((m) => m.CountriesModule),
  },
  //nota: cualquier ruta que no sea about, home, contact, va a navegar al home
  {
    path: '**',
    redirectTo: 'countries',
  },
];
//si es mi rout principal debo ponerle el método .forRoot(routes)
//si tengo modulos dentro de otros componentes, estos son modulos hijos. Por lo tanto pondria el metodo .forChild

//? exporto la configuración de RouterModule para que mi app.module.ts la coja, ya que es mi modulo principal de toda la app
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
