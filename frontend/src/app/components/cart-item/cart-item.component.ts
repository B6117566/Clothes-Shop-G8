import { ThrowStmt } from '@angular/compiler';
import { AfterContentChecked, Component, OnChanges, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  carts: any
  t = []
  n = []

  constructor(private cart: CartsService) { }

  ngOnInit(): void {
    this.onLoading()
  }

  onLoading(){
    this.t = []
    this.n = []
    this.cart.getCart().subscribe(
      (data) => {
        console.log(data)
        this.carts = data
        this.carts.map(data => {
          this.t.push(data.quantity*data.product_id.price)
          this.n.push(data.quantity)
        })
      }, (err) => {
        console.log(err)
      }
    )
  }

  delCart(id: any){
    this.cart.delCart(id).subscribe(
      (data) => {
        console.log(data)
      }, (err) => {
        console.log(err)
      }
    )
    window.location.reload()
  }

}
