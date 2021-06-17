import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-card-item-delete',
  templateUrl: './manage-card-item-delete.component.html',
  styleUrls: ['./manage-card-item-delete.component.css'],
})
export class ManageCardItemDeleteComponent implements OnInit {
  @Input() idProductSelect: string;

  constructor(private ps: ProductsService,private router: Router) {}

  ngOnInit(): void {}

  deleteProduct() {
    this.ps.deleteProduct(this.idProductSelect).subscribe(
      (data) => {
        alert(data.message);
      },
      (err) => {
        console.log(err);
      }
    );
    this.router.navigate(['/manage-product'])
  }
}
