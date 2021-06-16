import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-oder',
  templateUrl: './oder.component.html',
  styleUrls: ['./oder.component.css']
})
export class OderComponent implements OnInit {

  orders: any

  constructor(private order:  OrderService) { }

  ngOnInit(): void {
    this.onLoading()
  }

  onLoading(){
    this.order.getOrder().subscribe(
      (data) => {
        this.orders = data
      }, (err) => {
        console.log(err)
      }
    )
  }

}
