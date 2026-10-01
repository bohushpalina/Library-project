import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap, map, startWith } from 'rxjs/operators';
import { Book } from '../book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  // loading — пока ждём ответ Firestore (чтобы не мигало "Книга не найдена")
  vm$ = this.route.paramMap.pipe(
    switchMap(params =>
      this.bookService.getBook(Number(params.get('id'))).pipe(
        map(book => ({ loading: false, book })),
        startWith({ loading: true, book: undefined as Book | undefined })
      )
    )
  );
}