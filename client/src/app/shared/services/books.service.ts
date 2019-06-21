// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { BookModel } from 'src/app/shared/models/book.model';
import { FilterModel } from 'src/app/shared/models/filter.model';
// Enviroments
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { }

  public getBooks(skip: number): Observable<BookModel[]> {

    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/getBooks`, {skip});
  }

  public getBookById(id: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${environment.mongodb.databaseURL}/books/getById/` + id);
  }

  public addNewBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.mongodb.databaseURL}/books/addNewBook`, book);
  }

  public deleteBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.mongodb.databaseURL}/books/deleteBook`, book);
  }

  public changeBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.mongodb.databaseURL}/books/changeBook`, book);
  }

  public searchByTitle(title: FilterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/searchByTitle`, title);
  }

  public searchByAuthor(author: FilterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/searchByAuthor`, author);
  }

  public searchByType(type: FilterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/searchByType`, type);
  }

  public searchByPrice(price: {lower: number, upper: number}): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/searchByPrice`, price);
  }

}
