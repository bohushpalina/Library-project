import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Book } from '../book';
import { FirestoreService } from './firestore.service';

/**
 * Прослойка над FirestoreService.
 * Сигнатуры методов те же, что были раньше (Observable), поэтому
 * book-form и остальные компоненты продолжают работать без изменений.
 * Никакого localStorage / JSON — все данные только в Firestore.
 */
@Injectable({ providedIn: 'root' })
export class BookService {
  private fs = inject(FirestoreService);

  // Firestore не принимает undefined в полях — приводим книгу к чистому виду
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