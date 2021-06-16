import { Component, OnInit } from '@angular/core';
import { MenService } from 'src/app/services/genders/men.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  product: any

  constructor(private men: MenService) { }

  ngOnInit(): void {
  }

  onLoading(){
    this.men.getMenProduct().subscribe(
      (data) => {
        this.product = data
      }, (err) => {
        console.log(err)
      }
    )
  }



}
