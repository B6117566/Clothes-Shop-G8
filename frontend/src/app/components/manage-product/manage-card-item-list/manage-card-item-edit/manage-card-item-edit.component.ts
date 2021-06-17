import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-manage-card-item-edit',
  templateUrl: './manage-card-item-edit.component.html',
  styleUrls: ['./manage-card-item-edit.component.css'],
})
export class ManageCardItemEditComponent implements OnInit {
  @Input() productSelect: any;

  data_load: any;
  previewLoaded: boolean = false;

  constructor(
    private ps: ProductsService,
    private router: Router,
    public local: LocalStorageService
  ) {}

  productFrom = new FormGroup({
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  onChange(data: any) {
    this.productSelect = data;
    this.productFrom.setValue({
      name: data.name,
      detail: data.detail,
      price: data.price,
      file: data.file,
      img: data.img,
      quantity: data.quantity,
    });
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.productFrom.patchValue({
            img: reader.result,
          });
        };
      }
    }
  }

  update() {
    console.log(
      'click product update',
      this.productSelect,
      this.productFrom.value
    );
    this.ps.updateProduct(this.productFrom.value).subscribe(
      (data) => {
        if (data.message) {
          alert(data.message);
          this.router.navigate(['/manage-product']);
        } else {
          alert('Cannot Update Product');
        }
      },
      (err) => {
        console.log(err);
        alert('Cannot Update Product');
      }
    );
  }
  get productFormMethod() {
    return this.productFrom.controls;
  }
}
