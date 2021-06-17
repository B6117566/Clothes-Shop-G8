import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oder',
  templateUrl: './oder.component.html',
  styleUrls: ['./oder.component.css'],
})
export class OderComponent implements OnInit {
  orders: any;

  constructor(
    private order: OrderService,
    private local: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onLoading();
  }

  onLoading() {
    if (this.local.get('user') == undefined || this.local.get('user') == null) {
      this.router.navigate(['/login']);
    }
    this.order.getOrder().subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
