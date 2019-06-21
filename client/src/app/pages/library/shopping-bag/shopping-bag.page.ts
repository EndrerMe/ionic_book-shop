// Vendors
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modules
import { BookModel } from 'src/app/shared/models';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.page.html',
  styleUrls: ['./shopping-bag.page.scss'],
})
export class ShoppingBagPage implements OnInit {

  public bag: BookModel[] = JSON.parse(localStorage.getItem('bag'));

  public value: number;
  public visibility: boolean = true;

  constructor(
    private router: Router
  ) {
    this.visibility = false;
  }

  ngOnInit() {
    if (localStorage.getItem('bag') !== null) {
      if (this.bag.length === 0) {
        this.visibility = true;
      } else {
        this.visibility = false;
      }
    } else {
      this.visibility = true;
    }
  }
  public changePrice(book: BookModel, value: number): void {
    for (let i = 0; i < this.bag.length; i++) {
      if (book.id === this.bag[i].id) {
        this.bag[i].value = value;
      }
    }
  }

  public clearBag(): void {
    localStorage.removeItem('bag');
    this.bag = [];
    this.visibility = true;
  }

  public goToCatalog(): void {
    this.router.navigate['main/catalog'];
  }

  public deleteFromBag(id: string) {

    for (let i = 0; i < this.bag.length; i++) {
      if (this.bag[i].id === id) {
        this.bag.splice(i, 1);
      }
    }

    localStorage.setItem('bag', JSON.stringify(this.bag));
    if (JSON.parse(localStorage.getItem('bag')).length === 0) {
      this.visibility = true;
    }
  }

}
