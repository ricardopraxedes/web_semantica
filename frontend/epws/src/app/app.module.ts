import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CentralComponent } from './central/central.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { HomeComponent } from './home/home.component';
import { StoresComponent } from './stores/stores.component';

@NgModule({
  declarations: [
    AppComponent,
    CentralComponent,
    ProductsComponent,
    CartComponent,
    CarrouselComponent,
    HomeComponent,
    StoresComponent
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
