// Vendors
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

// Interfaces
import { IAuthor } from 'src/app/shared/interfaces';
// Services
import { AuthorsService, AlertService } from 'src/app/shared/services';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  styleUrls: ['./authors.page.scss'],
})
export class AuthorsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private authors: IAuthor[] = [];
  private visibility: string;
  private authorNameModalVisibility: boolean;
  private changedAuthor: IAuthor;
  private newAuthorModal: boolean;
  private skip: number = this.authors.length;

  constructor(
    private authorsService: AuthorsService,
    private alertService: AlertService

  ) {
    this.authorNameModalVisibility = false;
    this.newAuthorModal = false;
    this.addMoreData();
  }

  ngOnInit() {
  }

  public loadData(event): void {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.addMoreData();
    }, 500);
  }

  private addMoreData(): void {
    this.authorsService.getAuthors(this.skip).subscribe((res) => {
      if (this.authors.length === 0 ) {
        this.authors = res;
      } else {
        for (let i = 0; i < res.length; i++) {
          this.authors.push(res[i]);
        }
      }
      this.skip = this.authors.length;
    },
    (err) => {
      console.log(err);
    });
  }

  public toggleInfiniteScroll(): void {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  public openModal(author: IAuthor): void {
    this.changedAuthor = author;
    this.authorNameModalVisibility = true;
  }

  public showAuthorInfo(bookId: string): void {
    if (this.visibility === bookId) {
      this.visibility = '';
      return;
    }
    this.visibility = bookId;
  }

  public closeNewAuthorModal(): void {
    this.newAuthorModal = false;
  }

  public showModalAddNewAuthor(): void {
    this.newAuthorModal = true;
  }

  public addAuthor(authorName: string): void {
    let author: IAuthor;
    author = {
      name: authorName
    };
    this.authorsService.addNewAuthor(author).subscribe((res) => {
      this.authors.push(res);
      this.newAuthorModal = false;
    },
    (err) => {
      console.log(err);
      this.alertService.alert(err.error.error);
    });
  }

  public closeAuthorNameModal(): void {
    this.authorNameModalVisibility = false;
  }

  public changeName(authorName: string): void {
    let author: IAuthor;
    author = {
      id: this.changedAuthor.id,
      name: authorName
    };

    this.authorsService.changeAuthorName(author).subscribe((res) => {
      for (let i = 0; i < this.authors.length; i++) {
        if (this.authors[i].id === author.id) {
          this.authors[i] = author;
          this.authorNameModalVisibility = false;
        }
      }
    },
    (err) => {
      console.log(err);
      this.alertService.alert('Wrong data');
    });
  }

  public deleteAuthor(author: IAuthor): void {
    this.authorsService.deleteAuthor(author).subscribe((res) => {
      for (let i = 0; i < this.authors.length; i++) {
        if (this.authors[i] === author) {
          this.authors.splice(i, 1);
        }
      }
    },
    (err) => {
      console.log(err);
      this.alertService.alert('Wrong data');
    });
  }

}
