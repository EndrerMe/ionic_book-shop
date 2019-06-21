// Vendors
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonInfiniteScroll } from '@ionic/angular';

// Interfaces
import { IAuthor } from 'src/app/shared/interfaces';
// Models
import { BookModel } from 'src/app/shared/models';
// Services
import { BooksService, AuthorsService, AlertService } from 'src/app/shared/services';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  private newBookForm: FormGroup;
  public disabled: boolean = false;
  private ShowFilter: boolean = true;
  private authors: IAuthor[];
  private selectedItems: string[] = [];
  public dropdownSettings: {} = {};
  public newBookModalVisibility: boolean;
  public newAuthorModalVisibility: boolean;
  public inputAuthor: string;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private books: BookModel[] = [] as BookModel[];

  private visibility: string;
  public modalVisibility: boolean;
  private changeForm: FormGroup;
  private bookForChange: BookModel;
  public page: number = 1;

  private skip: number = this.books.length;

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private alertService: AlertService
  ) {
    this.newBookModalVisibility = false;
    this.newAuthorModalVisibility = false;
    this.addMoreData();
  }

  ngOnInit() {
    this.getAllAuthors();

    this.newBookForm = this.formBuilder.group({
      newBookTitle: new FormControl(
        '', [
          Validators.required
      ]),
      newBookType: new FormControl(
        '', [
          Validators.required
      ]),
      newBookAuthor: [this.selectedItems],
      newBookInfo: new FormControl(
        '', [
          Validators.required
      ]),
      newBookPrice: new FormControl(
        '', [
          Validators.required
      ]),
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
  };

    this.changeForm = this.formBuilder.group ({
      id: new FormControl(
        '', [
      ]),
      name: new FormControl(
        '', [
          Validators.required
      ]),
      type: new FormControl(
        '', [
          Validators.required
      ]),
      authors: [this.selectedItems],
      description: new FormControl(
        '', [
          Validators.required
      ]),
      price: new FormControl(
        '', [
          Validators.required
      ]),
    });
  }

  public loadData(event): void {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.addMoreData();
    }, 500);
  }

  private addMoreData(): void {
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

  public toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  public showModalAddNewAuthor(): void {
    this.newAuthorModalVisibility = true;
  }

  public closeNewAuthorModal(): void {
    this.newAuthorModalVisibility = false;
  }

  public showModalAddNewBook(): void {
    this.newBookModalVisibility = true;
  }

  public closeNewBookModal(): void {
    this.newBookModalVisibility = false;
  }

  public showBookInfo(bookId: string): void {
    if (this.visibility === bookId) {
      this.visibility = '';
      return;
    }
    this.visibility = bookId;
  }

  public addNewAuthor(authorName: string): void {
    let author: IAuthor;
    author = {
      name: authorName
    };
    this.authorsService.addNewAuthor(author).subscribe((res) => {
      this.authors.push(res);
      console.log(this.authors);
      this.newAuthorModalVisibility = false;
    },
    (err) => {
      console.log(err);
      this.alertService.alert(err.error.error);
    });
  }

  private getAllAuthors(): void {
    this.authorsService.getAllAuthors().subscribe((res) => {
      this.authors = res;
    },
    (err) => {
      console.log(err);
    });
  }

  public addNewBook(): void {
    this.booksService.addNewBook(this.newBookForm.value).subscribe((res) => {
      this.books.push(res);
      this.newBookForm.reset();
      this.newBookModalVisibility = false;
    },
    (err) => {
      console.log(err);
      this.alertService.alert(err.error.error);
    });
  }

  public openModal(book: BookModel): void {
    this.modalVisibility = true;
    this.bookForChange = book;
  }

  public closeModal(): void {
    this.modalVisibility = false;
  }

  public changeBook(): void {
    this.changeForm.value.id = this.bookForChange.id;
    this.booksService.changeBook(this.changeForm.value).subscribe((res) => {
      console.log(res);
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].id === this.bookForChange.id) {
          this.books[i] = this.changeForm.value;
        }
      }
      this.modalVisibility = false;
    },
    (err) => {
      console.log(err);
      this.alertService.alert(err.error.error);
    });
  }

  public deleteBook(book: BookModel): void {

    this.booksService.deleteBook(book).subscribe((res) => {
      console.log(res);
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i] === book) {
          this.books.splice(i, 1);
        }
      }
    },
    (err) => {
      console.log(err);
      this.alertService.alert(err.error.error);
    });
  }

}
