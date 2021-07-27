import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CentralComponent } from './central/central.component';
const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'central/:id', component: CentralComponent},
  {path: 'map', component: MapComponent},
  {path: 'login' , component :LoginComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
