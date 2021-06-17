import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-card-item-add',
  templateUrl: './manage-card-item-add.component.html',
  styleUrls: ['./manage-card-item-add.component.css'],
})
export class ManageCardItemAddComponent implements OnInit {
  constructor(private ps: ProductsService, private router: Router) {}

  typeProducts: any;
  genders: any;
  previewLoaded: boolean = false;

  ngOnInit(): void {
    this.onLoading();
  }

  productFrom = new FormGroup({
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
    status_favorite: new FormControl(false),
    gender_id: new FormControl('', [Validators.required]),
    typeproduct_id: new FormControl('', [Validators.required]),
  });

  onLoading() {
    this.ps.getTypeProduct().subscribe(
      (data) => {
        this.typeProducts = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.ps.getGenderlist().subscribe(
      (data) => {
        this.genders = data;
      },
      (err) => {
        console.log(err);
      }
    );
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

  addProduct() {
    console.log(this.productFrom.value);
    this.ps.addProduct(this.productFrom.value).subscribe(
      (data) => {
        if (data.message) {
          alert(data.message);
          this.router.navigate(['/manage-product']);
        } else {
          alert('Cannot Add Product');
        }
      },
      (err) => {
        console.log(err);
        alert('Cannot Add Product');
      }
    );
  }

  resetForm() {
    this.productFrom.reset();
  }

  get productFromMethod() {
    return this.productFrom.controls;
  }
}
