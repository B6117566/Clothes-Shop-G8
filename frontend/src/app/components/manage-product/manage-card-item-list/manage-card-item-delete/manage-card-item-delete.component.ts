import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-card-item-delete',
  templateUrl: './manage-card-item-delete.component.html',
  styleUrls: ['./manage-card-item-delete.component.css'],
})
export class ManageCardItemDeleteComponent implements OnInit {
  @Input() idProductSelect: string;

  constructor(private ps: ProductsService) {}

  ngOnInit(): void {}

  deleteProduct() {
    console.log("TEST DELETE55555",this.idProductSelect)
    this.ps.deleteProduct(this.idProductSelect).subscribe(
      (data) => {
        alert(data.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
