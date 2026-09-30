import { Injectable } from '@angular/core';
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

  // Проверка, что код выполняется в браузере (защита от ошибок при SSR)
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Загружаем книги из localStorage, а если их там нет — из мок-файла
  private loadBooks(): void {
    if (this.isBrowser()) {
      const savedBooks = localStorage.getItem(this.storageKey);
      if (savedBooks) {
        this.booksList = JSON.parse(savedBooks);
        return;
      }
    }
    // Если в localStorage ничего нет, берём начальные данные
    this.booksList = [...Books];
    this.saveToStorage();
  }

  // Сохраняем текущий массив книг в localStorage в формате JSON-строки
  private saveToStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.booksList));
    }
  }

  getBooks(): Book[] {
    return this.booksList;
  }

  getBook(id: number): Book | undefined {
    return this.booksList.find(book => book.id === id);
  }

  addBook(book: Book): void {
    const newId = this.booksList.length > 0 
      ? Math.max(...this.booksList.map(b => b.id)) + 1 
      : 1;
    this.booksList.push({ ...book, id: newId });
    this.saveToStorage(); // Сохраняем изменения
  }

  updateBook(updatedBook: Book): void {
    const index = this.booksList.findIndex(b => b.id === updatedBook.id);
    if (index !== -1) {
      this.booksList[index] = { ...updatedBook };
      this.saveToStorage(); // Сохраняем изменения
    }
  }

  deleteBook(id: number): void {
    const index = this.booksList.findIndex(b => b.id === id);
    if (index !== -1) {
      this.booksList.splice(index, 1);
      this.saveToStorage(); // Сохраняем изменения
    }
  }
}