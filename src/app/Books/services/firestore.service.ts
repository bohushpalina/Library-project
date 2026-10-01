import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { Books } from '../mock-book-list';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  private booksCollection = collection(this.firestore, 'list-books');

  // Firebase-потоки создаём внутри контекста внедрения зависимостей,
  // чтобы AngularFire не ругался, когда метод вызван из switchMap и т.п.
  private run<T>(fn: () => T): T {
    return runInInjectionContext(this.injector, fn);
  }

  // Все книги (в реальном времени, по возрастанию id)
  getBooks(): Observable<Book[]> {
    return this.run(() =>
      collectionData(query(this.booksCollection, orderBy('id')))
    ) as Observable<Book[]>;
  }

  // Одна книга (в реальном времени). Если документа нет — undefined
  getBook(id: number): Observable<Book | undefined> {
    return this.run(() =>
      docData(doc(this.firestore, `list-books/${id}`))
    ) as Observable<Book | undefined>;
  }

  // Добавить / перезаписать книгу (id документа = id книги)
  addBook(book: Book): Promise<void> {
    return setDoc(doc(this.firestore, `list-books/${book.id}`), book);
  }

  updateBook(id: number, data: Partial<Book>): Promise<void> {
    return updateDoc(doc(this.firestore, `list-books/${id}`), data);
  }

  deleteBook(id: number): Promise<void> {
    return deleteDoc(doc(this.firestore, `list-books/${id}`));
  }

  // Разовая заливка данных из mock-book-list.ts (сама нигде не вызывается)
  addAllBooks(): Promise<void[]> {
    return Promise.all(Books.map((book: Book) => this.addBook(book)));
  }
}