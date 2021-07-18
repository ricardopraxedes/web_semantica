import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { CentralComponent } from './central/central.component';
const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'central', component: CentralComponent},
  {path: 'cart', component: CartComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
