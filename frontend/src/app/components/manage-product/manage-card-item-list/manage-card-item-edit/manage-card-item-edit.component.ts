import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-card-item-edit',
  templateUrl: './manage-card-item-edit.component.html',
  styleUrls: ['./manage-card-item-edit.component.css'],
})
export class ManageCardItemEditComponent implements OnInit {
  @Input() productSelect: any;

  constructor(private ps: ProductsService) {}

  ngOnInit(): void {}

  
}
