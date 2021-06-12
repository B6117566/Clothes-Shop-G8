import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { MenComponent } from './components/men/men.component';
import { WomenComponent } from './components/women/women.component';
import { ProductComponent } from './components/product/product.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'manage-product', component: ManageProductComponent },
  {path: 'product', component: ProductComponent},
  {path: 'favorite', component: FavoriteComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
