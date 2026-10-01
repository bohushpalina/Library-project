import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookListComponent {
  private bookService = inject(BookService);

  // Поток из Firestore: список обновляется сам при любых изменениях в базе
  books$ = this.bookService.getBooks();

  deleteBook(id: number): void {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
      this.bookService.deleteBook(id).subscribe();
    }
  }
}