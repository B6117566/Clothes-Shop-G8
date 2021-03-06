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
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageCardItemListComponent } from './components/manage-product/manage-card-item-list/manage-card-item-list.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { FavoriteItemComponent } from './components/favorite-item/favorite-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { DetailComponent } from './components/carditem/detail/detail.component';
import { ManageCardItemEditComponent } from './components/manage-product/manage-card-item-list/manage-card-item-edit/manage-card-item-edit.component';
import { ManageCardItemAddComponent } from './components/manage-product/manage-card-item-add/manage-card-item-add.component';
import { ManageCardItemDeleteComponent } from './components/manage-product/manage-card-item-list/manage-card-item-delete/manage-card-item-delete.component';
import { LoginComponent } from './components/login/login.component';
import { SingnupComponent } from './components/singnup/singnup.component';
import { EditComponent } from './components/edit/edit.component';
import { OderComponent } from './components/oder/oder.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MenComponent,
    CarditemComponent,
    WomenComponent,
    ManageProductComponent,
    ManageCardItemListComponent,
    FavoriteComponent,
    FavoriteItemComponent,
    CartComponent,
    CartItemComponent,
    DetailComponent,
    ManageCardItemEditComponent,
    ManageCardItemAddComponent,
    ManageCardItemDeleteComponent,
    LoginComponent,
    SingnupComponent,
    EditComponent,
    OderComponent,
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
