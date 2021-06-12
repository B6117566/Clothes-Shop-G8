import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MenComponent } from './components/men/men.component';
import { CarditemComponent } from './components/carditem/carditem.component';
import { WomenComponent } from './components/women/women.component';
import { ProductComponent } from './components/product/product.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageCardItemListComponent } from './components/manage-product/manage-card-item-list/manage-card-item-list.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { FavoriteItemComponent } from './components/favorite-item/favorite-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MenComponent,
    CarditemComponent,
    WomenComponent,
    ProductComponent,
    ManageProductComponent,
    ManageCardItemListComponent,
    FavoriteComponent,
    FavoriteItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularWebStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
