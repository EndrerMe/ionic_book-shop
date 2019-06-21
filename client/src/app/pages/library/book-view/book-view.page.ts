// Vendors
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Modules
import { BookModel } from 'src/app/shared/models';
// Services
import { BooksService } from 'src/app/shared/services';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.page.html',
  styleUrls: ['./book-view.page.scss'],
})
export class BookViewPage implements OnInit {

  private book: BookModel;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
  ) {
    this.getBook(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
  }

  private getBook(id: string): void {
    this.booksService.getBookById(id).subscribe((res) => {
      this.book = res;
      console.log(this.book);
    },
    (err) => {
      console.log(err);
    });
  }

}
