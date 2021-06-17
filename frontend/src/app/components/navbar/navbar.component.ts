import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  AfterContentChecked,
  OnChanges,
} from '@angular/core';
import { MenService } from 'src/app/services/genders/men.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  product: any;
  status_icon: boolean = true
  constructor(
    private men: MenService,
    private local: LocalStorageService,
    private router: Router
  ) {
 
    if(this.local.get('user') == undefined || this.local.get('user') == null){
      this.status_icon = false
    }else{
      this.status_icon = true
    }
  }

  ngOnInit(): void {}

  onLoading() {
    this.men.getMenProduct().subscribe(
      (data) => {
        this.product = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  signout() {
    this.local.set('user', undefined, 1, 'w');
    this.router.navigate(['/login']);
  }
}
