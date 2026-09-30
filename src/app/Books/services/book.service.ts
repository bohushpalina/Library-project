import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../book';
import { Books } from '../mock-book-list';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private storageKey = 'books_data';
  private booksList: Book[] = [];

  constructor() {
    this.loadBooks();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadBooks(): void {
    if (this.isBrowser()) {
      const savedBooks = localStorage.getItem(this.storageKey);
      if (savedBooks) {
        this.booksList = JSON.parse(savedBooks);
        return;
      }
    }
    this.booksList = [...Books];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.booksList));
    }
  }

  getBooks(): Observable<Book[]> {
    return of([...this.booksList]);
  }

  getBook(id: number): Observable<Book | undefined> {
    const foundBook = this.booksList.find(book => Number(book.id) === Number(id));
    return of(foundBook ? { ...foundBook } : undefined);
  }

  addBook(book: Book): Observable<Book> {
    const newId = this.booksList.length > 0 
      ? Math.max(...this.booksList.map(b => Number(b.id))) + 1 
      : 1;

    const newBook: Book = { ...book, id: newId };
    this.booksList.push(newBook);
    this.saveToStorage();

    return of(newBook);
  }

  updateBook(updatedBook: Book): Observable<Book> {
    const index = this.booksList.findIndex(b => Number(b.id) === Number(updatedBook.id));
    if (index !== -1) {
      this.booksList[index] = { ...updatedBook };
      this.saveToStorage();
    }
    return of(updatedBook);
  }

  deleteBook(id: number): Observable<boolean> {
    const index = this.booksList.findIndex(b => Number(b.id) === Number(id));
    let isDeleted = false;

    if (index !== -1) {
      this.booksList.splice(index, 1);
      this.saveToStorage();
      isDeleted = true;
    }

    return of(isDeleted);
  }
}