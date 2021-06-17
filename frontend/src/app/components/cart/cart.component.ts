import { AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { LocalStorageService } from 'angular-web-storage';
import { OrderService } from 'src/app/services/order.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked {

  @ViewChild(CartItemComponent) carditem: CartItemComponent

  total: number
  count: number
 
  constructor(private oder: OrderService, public local: LocalStorageService, private cart: CartsService) { }

  ngOnInit(): void {
    this.count = 0
    this.total = 0
  }

  ngAfterViewChecked(){
    let totol = 0
    let count = 0
    this.carditem.t.map(data => {
      totol += data
    })
    this.carditem.n.map(data => {
      count += data
    })
    this.count = count
    this.total = totol
  }

  apply(){
    if(this.carditem.carts !== undefined){
      this.carditem.carts.map(data => {
        const body = {
          quantity: data.quantity,
          user_id: this.local.get('user').result.id,
          product_id: data.product_id._id
        };
        console.log(body)
        this.oder.addOder(body).subscribe(
          (data) => {
            console.log(data)
          }, (err) => {
            console.log(err)
          }
        )
        this.cart.delCart(data._id).subscribe(
          (data) => {
            console.log(data)
          }, (err) => {
            console.log(err)
          }
        )
      })
      alert("Apply product success")
      window.location.reload()
    }else{
      alert("Cannot apply product")
    }
    
    
  }

}
