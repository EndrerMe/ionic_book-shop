// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environmets
import { environment } from 'src/environments/environment';
// Models
import { IAuthor } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private http: HttpClient
  ) {}

  public getAuthors(skip: number): Observable<IAuthor[]> {
    return this.http.post<IAuthor[]>(`${environment.mongodb.databaseURL}/authors/getAuthors`, {skip});
  }

  public getAllAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${environment.mongodb.databaseURL}/authors/getAllAuthors`);
  }

  public addNewAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.mongodb.databaseURL}/authors/addNewAuthor`, author);
  }
  public changeAuthorName(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.mongodb.databaseURL}/authors/changeAuthorName`, author);
  }

  public deleteAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.mongodb.databaseURL}/authors/deleteAuthor`, author);
  }
}
