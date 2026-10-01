import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { take } from 'rxjs/operators';
import { Book } from '../book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookFormComponent implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  book: Book = { id: 0, name: '', author: '' };
  isEditMode = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      // take(1): Firestore-поток живой, а форме нужно одно начальное значение —
      // иначе любое обновление в базе перезаписывало бы то, что пользователь печатает
      this.bookService.getBook(id).pipe(take(1)).subscribe(existingBook => {
        if (existingBook) {
          this.book = { ...existingBook };
          this.isEditMode = true;
          // Ответ Firestore приходит асинхронно — просим Angular перерисовать форму
          this.cdr.detectChanges();
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.book).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.bookService.addBook(this.book).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}