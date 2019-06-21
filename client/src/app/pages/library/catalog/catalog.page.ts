// Vendors
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, Events, PopoverController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

// Sevices
import { BooksService, BagService } from 'src/app/shared/services';
// Modules
import { BookModel } from 'src/app/shared/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  private books: BookModel[] = [] as BookModel[];

  private skip: number = this.books.length;

  public showFilter: boolean = false;
  public hideData: boolean = true;
  public searchTitle: string;
  public searchType: string;
  public searchAuthor: string;
  public searchPrice: {lower: number, upper: number};

  public searchTitleUpdate = new Subject<string>();
  public searchTypeUpdate = new Subject<string>();
  public searchAuthorUpdate = new Subject<string>();
  public searchPriceUpdate = new Subject<{lower: number, upper: number}>();

  public inputBookTitle = document.getElementById('inputBookTitle');

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private bagService: BagService,
    private events: Events,
    private popoverCtrl: PopoverController
  ) {
    this.addMoreData();

    this.searchTitleUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        if (value.length === 0) {
          this.hideData = true;
          this.addMoreData();
        }
        if (value.length < 3) {
          this.hideData = true;
          return;
        }

        if (value.length >= 3) {
          const title: string = value;
          this.booksService.searchByTitle({title})
          .subscribe((res) => {
            this.books = [];
            this.books = res;
            this.hideData = false;
          });
        }
      });

    this.searchTypeUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        if (value.length === 0) {
          this.hideData = true;
          this.addMoreData();
        }
        if (value.length < 3) {
          this.hideData = true;
          return;
        }

        if (value.length >= 3) {
          const type: string = value;
          this.booksService.searchByType({type}).subscribe((res) => {
            this.books = [];
            this.books = res;
            this.hideData = false;
          });
        }
      });

    this.searchAuthorUpdate.pipe(
    debounceTime(500),
    distinctUntilChanged())
    .subscribe(value => {
      if (value.length === 0) {
        this.hideData = true;
        this.addMoreData();
      }
      if (value.length < 3) {
        this.hideData = true;
        return;
      }

      if (value.length >= 3) {

        const author: string = value;

        this.booksService.searchByAuthor({author})
        .subscribe((res) => {
          this.books = [];

          this.books = res;
          this.hideData = false;
        });
      }
    });


    this.searchPriceUpdate.pipe(
    debounceTime(500),
    distinctUntilChanged())
    .subscribe(value => {

      const price: {lower: number, upper: number} = value;

      this.booksService.searchByPrice(price).subscribe((res) => {
        this.books = [];
        this.books = res;
        this.hideData = false;
      });
    });
  }

  ngOnInit() {
  }

  public loadData(event): void {
    setTimeout(() => {
      event.target.complete();

      this.addMoreData();
    }, 1000);
  }

  public toggleInfiniteScroll(): void {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  private addMoreData() {
    this.booksService.getBooks(this.skip).subscribe((res) => {
      if (this.books.length === 0 ) {
        this.books = res;
      } else {
        for (let i = 0; i < res.length; i++) {
          this.books.push(res[i]);
        }
      }
      this.skip = this.books.length;
    },
    (err) => {
      console.log(err);
    });
  }

  public showBook(id: string): void {
    this.router.navigate(['book/' + id]);
  }

  public addToBag(book: BookModel): void {
    this.bagService.addToBag(book);
    this.events.publish('book:inBag', Date.now());
  }

  public showMoreFilter(): void {
    this.showFilter = !this.showFilter;
  }

}
