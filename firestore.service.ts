import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Book } from '../book';
import { Books } from '../mock-book-list';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore = inject(Firestore);

  private booksCollection = collection(
    this.firestore,
    'list-books'
  );

  // Получить все книги
  getBooks(): Observable<Book[]> {
    return collectionData(
      this.booksCollection
    ) as Observable<Book[]>;
  }

  // Получить одну книгу
  getBook(id: number): Observable<Book> {
    const bookDocument = doc(
      this.firestore,
      `list-books/${id}`
    );

    return docData(bookDocument) as Observable<Book>;
  }

  // Добавить книгу
  addBook(book: Book): Promise<void> {
    const bookDocument = doc(
      this.firestore,
      `list-books/${book.id}`
    );

    return setDoc(bookDocument, book);
  }

  // Изменить книгу
  updateBook(
    id: number,
    data: Partial<Book>
  ): Promise<void> {
    const bookDocument = doc(
      this.firestore,
      `list-books/${id}`
    );

    return updateDoc(bookDocument, data);
  }

  // Удалить книгу
  deleteBook(id: number): Promise<void> {
    const bookDocument = doc(
      this.firestore,
      `list-books/${id}`
    );

    return deleteDoc(bookDocument);
  }

  // Добавить все книги из mock-book-list
  addAllBooks(): Promise<void[]> {
    return Promise.all(
      Books.map(book => this.addBook(book))
    );
  }
}
