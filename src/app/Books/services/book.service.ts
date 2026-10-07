import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Book } from '../book';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class BookService {
  private fs = inject(FirestoreService);

  private clean(book: Book): Book {
    return {
      id: Number(book.id),
      name: book.name ?? '',
      author: book.author ?? ''
    };
  }

  getBooks(): Observable<Book[]> {
    return this.fs.getBooks();
  }

  getBook(id: number): Observable<Book | undefined> {
    return this.fs.getBook(Number(id));
  }

  addBook(book: Book): Observable<Book> {
    return this.fs.getBooks().pipe(
      take(1),
      switchMap(books => {
        const newId = books.length > 0
          ? Math.max(...books.map(b => Number(b.id))) + 1
          : 1;
        const newBook = this.clean({ ...book, id: newId });
        return from(this.fs.addBook(newBook)).pipe(map(() => newBook));
      })
    );
  }

  updateBook(updatedBook: Book): Observable<Book> {
    const book = this.clean(updatedBook);
    return from(this.fs.updateBook(book.id, book)).pipe(map(() => book));
  }

  deleteBook(id: number): Observable<boolean> {
    return from(this.fs.deleteBook(Number(id))).pipe(map(() => true));
  }
}